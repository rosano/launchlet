const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLaunchxrCommand: '.LCHLaunchxrCommand',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LCHLaunchxrCommand_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHLaunchxrCommand', function () {
		browser.assert.elements(LCHLaunchxrCommand, 1);
	});

});
