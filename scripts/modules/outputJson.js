const fs = require('fs');

// JSON出力
module.exports = function (path, fileName, target) {
	fs.writeFile(path + fileName + '.json', JSON.stringify(target), (err) => {
		if (err) throw err;
		console.log(fileName + '.json has been saved!');
	});
}