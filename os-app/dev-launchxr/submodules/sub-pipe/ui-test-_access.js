const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLaunchxrPipe: '.LCHLaunchxrPipe',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LCHLaunchxrPipe_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHLaunchxrPipe', function () {
		browser.assert.elements(LCHLaunchxrPipe, 1);
	});

});
