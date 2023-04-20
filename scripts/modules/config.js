const config = {
	current: process.env.CURRENT ? process.env.CURRENT : 'https://www.yahoo.co.jp',
	reference: process.env.REFERENCE ? process.env.REFERENCE : 'https://www.yahoo.co.jp',
	defaultViewportForPc: {
		width: 1680,
		height: 1050,
	},
	defaultViewportForSp: {
		width: 750,
		height: 1334,
	},
};
module.exports = config;