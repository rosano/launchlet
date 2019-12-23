const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposePair: '.LCHComposePair',
	
	LCHComposePairKeyField: '.LCHComposePairKeyField',
	LCHComposePairSubmitButton: '.LCHComposePairSubmitButton',
	
	LCHComposePairClearButton: '.LCHComposePairClearButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposePair_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHComposePairKeyField', function() {
		browser.assert.elements(LCHComposePairKeyField, 1);
	});
	
	it('shows LCHComposePairSubmitButton', function() {
		browser.assert.elements(LCHComposePairSubmitButton, 1);
	});
	
	it('hides LCHComposePairClearButton', function() {
		browser.assert.elements(LCHComposePairClearButton, 0);
	});

	context('LCHComposePairClearIsVisible', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposePairClearIsVisible: true,
			});
		});

		it('hides LCHComposePairKeyField', function () {
			browser.assert.elements(LCHComposePairKeyField, 0);
		});

		it('hides LCHComposePairSubmitButton', function () {
			browser.assert.elements(LCHComposePairSubmitButton, 0);
		});
		
		it('shows LCHComposePairClearButton', function() {
			browser.assert.elements(LCHComposePairClearButton, 1);
		});
	
	});

});
