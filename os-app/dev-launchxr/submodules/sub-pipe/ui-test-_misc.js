const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPipe_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLauncherInput: uStubStringifyAll({
				LCHOptionMode: 'kLCHLauncherModePipe',
			}),
		});
	});

	it('classes LCHLauncher', function () {
		browser.assert.hasClass(LCHLauncherPipe, 'LCHLauncher');
	});

});
