const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherPipe: '.LCHLauncherPipe',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LCHLauncherPipe_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLauncherInput: uStubStringifyAll({
				LCHOptionMode: 'kLCHLauncherModePipe',
			}),
		});
	});

	it('shows LCHLauncherPipe', function () {
		browser.assert.elements(LCHLauncherPipe, 1);
	});

});
