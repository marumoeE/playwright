const setting = {
	waitOption: {
		waitUntil: 'networkidle0',
		timeout: 0
	},
	waitTime: 10000,
	loginUser: process.env.LOGINUSER ? process.env.LOGINUSER : 'test@example.com',
	loginPassword: process.env.LOGINPASSWORD ? process.env.LOGINPASSWORD : 'test1234',
	browserType: process.env.BROWSER ? process.env.BROWSER : 'chromium',
	mainDevice: process.env.DEVICE ? process.env.DEVICE : 'pc',
	target: process.env.TARGET ? process.env.TARGET : 'current',
};
module.exports = setting;

