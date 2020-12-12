const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHGuide: '.LCHGuide',

	LCHGuideCrown: '.LCHGuideCrown',
	LCHGuideCrownName: '.LCHGuideCrownName',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHGuide', function () {
		browser.assert.elements(LCHGuide, 1);
	});

	it('shows LCHGuideCrown', function () {
		browser.assert.elements(LCHGuideCrown, 1);
	});

	it('shows LCHGuideCrownName', function () {
		browser.assert.elements(LCHGuideCrownName, 1);
	});

	it('shows LCHRootLink', function () {
		browser.assert.elements('.LCHRootLink', 1);
	});

});
