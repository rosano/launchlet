const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrPipe_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('classes LCHLaunchxr', function () {
		browser.assert.hasClass(LCHLaunchxrPipe, 'LCHLaunchxr');
	});

});
