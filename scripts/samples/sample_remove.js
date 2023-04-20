const removeFiles = require('../modules/removeFiles');

// 出力ファイルをすべて消去
removeFiles('./result/data/');
removeFiles('./result/json/');
removeFiles('./result/screenshot/current/pc/');
removeFiles('./result/screenshot/current/sp/');
removeFiles('./result/screenshot/reference/pc/');
removeFiles('./result/screenshot/reference/sp/');
removeFiles('./result/screenshot/diff/pc/');
removeFiles('./result/screenshot/diff/sp/');