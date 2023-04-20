const fs = require('fs');
const looksSame = require('looks-same');
const outputJson = require('./outputJson');

module.exports = function (target) {
	(async () => {
		const path = './result/screenshot/current/' + target;
		const allDirents = fs.readdirSync(path, {withFileTypes: true});
		const fileNames = allDirents.filter(dirent => dirent.isFile()).map(({name}) => name);
		const fileList = fileNames.filter((name) => name !== '.DS_Store');
		const diffList = [];

		for (const file of fileList) {
			await looksSame('./result/screenshot/current/' + target + '/' + file, './result/screenshot/reference/' + target + '/' + file,
				await function (error, {equal}) {
				if (!equal) {
					diffList.push(file);
					outputJson('./result/json/', 'diffList', diffList);
				}
			});
		}
	})();
}