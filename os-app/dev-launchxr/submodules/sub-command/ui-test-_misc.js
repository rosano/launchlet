const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrCommand_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('classes LCHLaunchxr', function () {
		browser.assert.hasClass(LCHLaunchxrCommand, 'LCHLaunchxr');
	});

});
