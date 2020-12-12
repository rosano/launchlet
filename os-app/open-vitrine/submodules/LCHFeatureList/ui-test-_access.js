const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHFeatureList: '.LCHFeatureList',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHFeatureList_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows LCHFeatureList', function() {
		browser.assert.elements(LCHFeatureList, 1);
	});
	
	it('shows OLSKFeatureList', function() {
		browser.assert.elements('.OLSKFeatureList', 1);
	});
	
});
