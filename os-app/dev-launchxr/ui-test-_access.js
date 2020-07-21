const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLaunchxr: '.LCHLaunchxr',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLaunchxr_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHLaunchxr', function() {
		browser.assert.elements(LCHLaunchxr, 1)
	});

});
