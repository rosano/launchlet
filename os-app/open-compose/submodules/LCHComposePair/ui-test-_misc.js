const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposePair_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('LCHComposePairKeyField', function test_LCHComposePairKeyField () {

		it('sets autofocus', function () {
			browser.assert.attribute(LCHComposePairKeyField, 'autofocus', '');
		});
		
	});

	describe('LCHComposePairSubmitButton', function test_LCHComposePairSubmitButton () {
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestLCHComposePairDispatchSubmit', '0');
			});
			
			before(function () {
				browser.assert.text('#TestLCHComposePairDispatchSubmitData', 'undefined');
			});
			
			before(function () {
				browser.fill(LCHComposePairKeyField, 'alfa');
			});
			
			before(function () {
				browser.pressButton(LCHComposePairSubmitButton);
			});

			it.skip('sends LCHComposePairDispatchSubmit', function () { // #skip-zombie-form
				browser.assert.text('#TestLCHComposePairDispatchSubmit', '1');
			});

			it('sends LCHComposePairDispatchSubmitData', function () {
				browser.assert.text('#TestLCHComposePairDispatchSubmitData', 'alfa');
			});

		});
	
	});

	describe('LCHComposePairClearButton', function test_LCHComposePairClearButton () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposePairClearIsVisible: true,
			});
		});
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestLCHComposePairDispatchClear', '0');
			});
			
			before(function () {
				return browser.pressButton(LCHComposePairClearButton);
			});

			it('sends LCHComposePairDispatchClear', function () {
				browser.assert.text('#TestLCHComposePairDispatchClear', '1');
			});

		});
	
	});

});
