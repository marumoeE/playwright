const fs = require('fs');

// ファイルを削除
module.exports = function (path) {
	const targetRemoveFiles = fs.readdirSync(path);
	for (let file in targetRemoveFiles) {
		try {
			fs.unlinkSync(path + targetRemoveFiles[file]);
		} catch (error) {
			throw error;
		}
	}
}