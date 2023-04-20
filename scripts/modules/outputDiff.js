const fs = require('fs');
const looksSame = require('looks-same');

module.exports = function (target) {
	const diffList = JSON.parse(fs.readFileSync('result/json/diffList.json', 'utf8'));
	console.log(diffList);
	for (const file of diffList) {
		looksSame.createDiff({
			current: './result/screenshot/current/' + target + '/' + file,
			reference: './result/screenshot/reference/' + target + '/' + file,
			diff: './result/screenshot/diff/' + target + '/' + file,
			highlightColor: '#ff00ff', // color to highlight the differences
		}, function (error) {
			//
		});
	}
}