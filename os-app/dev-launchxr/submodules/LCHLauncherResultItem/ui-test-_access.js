const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLaunchxrResultItem: '.LCHLaunchxrResultItem',

	LCHLaunchxrResultItemTitle: '.LCHLaunchxrResultItemTitle',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLaunchxrResultItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLaunchxrResultItemObject: JSON.stringify({}),
		});
	});

	it('shows LCHLaunchxrResultItem', function () {
		browser.assert.elements(LCHLaunchxrResultItem, 1);
	});

	it('shows LCHLaunchxrResultItemTitle', function () {
		browser.assert.elements(LCHLaunchxrResultItemTitle, 1);
	});

});
