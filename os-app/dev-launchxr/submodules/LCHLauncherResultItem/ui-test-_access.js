const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherResultItem: '.LCHLauncherResultItem',

	LCHLauncherResultItemTitle: '.LCHLauncherResultItemTitle',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherResultItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherResultItemObject: JSON.stringify({}),
		});
	});

	it('shows LCHLauncherResultItem', function () {
		browser.assert.elements(LCHLauncherResultItem, 1);
	});

	it('shows LCHLauncherResultItemTitle', function () {
		browser.assert.elements(LCHLauncherResultItemTitle, 1);
	});

});
