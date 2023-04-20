const fs = require('fs');
const playwright = require('playwright');
const iphone11 = playwright.devices['iPhone 11'];
const config = require('./config');
const setting = require('./setting');
const outputJson = require('./outputJson');

// スクリーンショットを取得する
module.exports = function (urls, login, device, browserType, type, simulation, ver) {
	const option = (device === 'sp') ? {
		...iphone11
	} : {};
	const targetBrowser = browserType;
	const domain = (type === 'current') ? config.current : config.reference;

	// スクロール調整
	const adjustScrolling = async (page) => {
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
		await page.setViewportSize({width: bodyWidth, height: bodyHeight});
	}

	(async () => {
		// ブラウザ設定
		const browser = await playwright[targetBrowser].launch({
			headless: process.env.HEADLESS ? JSON.parse(process.env.HEADLESS.toLowerCase()) : false,
			defaultViewport: (device === 'pc') ? config.defaultViewportForPc : config.defaultViewportForSp,
			args: [
				'--no-sandbox',
				'--start-maximized',
			],
		});
		const context = await browser.newContext(option);

		// 画面のタイトル
		const titleList = [];
		// スクリーンショットの名前
		const nameList = [];
		// エラーリスト
		const errorList = [];

		for (const url of urls) {
			try {
				const page = await context.newPage();

				// ログイン作業
				if (login) {
					await page.goto(domain + '/login'); // 任意のログイン画面へ遷移を記述

					// 任意のログイン時の操作を記述

					await page.waitForNavigation({timeout: 60000, waitUntil: 'domcontentloaded'});
				}

				// 対象画面へ遷移
				await page.goto(domain + url, setting.waitOption);

				// 画面操作の処理を行う
				if (simulation) {
					await simulation(page);
				}

				// タイトルリストを作成
				const title = await page.evaluate(() => {
					return document.title;
				});
				titleList.push(title);

				// スクリーンショットの名前リストを作成
				const canonical = await page.evaluate(() => {
					// 以下はブラウザ側で動く処理
					for (link of document.getElementsByTagName('link')) {
						if (link.getAttribute('rel') === 'canonical') {
							return link.getAttribute('href');
						}
					}
					return document.location.href;
				});
				const name = canonical.replace(domain, 'SS').replace(/\//g, '_');
				nameList.push(name);

				// 画面をスクロールして描画
				await adjustScrolling(page);
				await page.waitForTimeout(setting.waitTime);
				// スクリーンショットを取得
				const version = (ver) ? '_' + ver : '';
				const fileName = name + version + '_' + targetBrowser + '.png';
				await page.screenshot({
					path: './result/screenshot/' + type + '/' + device + '/' + fileName,
					fullPage: true
				});

				// 画面閉じる
				await page.close();
			} catch (err) {
				console.log('このURLで失敗 -> ' + url);
				errorList.push(url);
				console.log(err);
			}
		}
		await browser.close();
		if (errorList.length) {
			console.log('SSの取得に失敗した画面があります。出力されたリストを確認してください。');
			outputJson('./result/json/', 'errorList_' + device + '_' + type + '_' + browserType, errorList);
		} else {
			console.log('SSの取得に失敗した画面は存在しません');
		}
	})();
}