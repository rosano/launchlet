const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHGuide: '.LCHGuide',

	LCHGuideIdentity: '.LCHGuideIdentity',
	LCHGuideIdentityName: '.LCHGuideIdentityName',
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

	it('shows LCHGuideIdentity', function () {
		browser.assert.elements(LCHGuideIdentity, 1);
	});

	it('shows LCHGuideIdentityName', function () {
		browser.assert.elements(LCHGuideIdentityName, 1);
	});

	it('shows LCHRootLink', function () {
		browser.assert.elements('.LCHRootLink', 1);
	});

});
