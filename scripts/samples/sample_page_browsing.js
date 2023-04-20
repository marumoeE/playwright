const fs = require('fs');
const setting = require('../modules/setting');
const getScreenshot = require('../modules/getScreenshot');

const selectJson = process.env.JSON ? process.env.JSON : 'browsing_page_not_login_url.json';
const json = JSON.parse(fs.readFileSync('scripts/samples/' + selectJson, 'utf8'));
const urls = process.env.URL ? process.env.URL.split(',') : json;
const login = process.env.LOGIN ? JSON.parse(process.env.LOGIN.toLowerCase()) : false;
getScreenshot(urls, login, setting.mainDevice, setting.browserType, setting.target);