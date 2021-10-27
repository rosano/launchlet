const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrPrompt_Filter', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLaunchxrPromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	context('no match', function () {
		
		before(function () {
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '0');
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', 'undefined');
		});

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'charlie');
		});

		it('filters all', function() {
			browser.assert.elements(LCHLaunchxrPromptResultItem, 0);
		});
		
		it('sends LCHLaunchxrPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '1');	
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', 'undefined');
		});

	});

	context('partial match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'a');
		});

		it('filters partial', function() {
			browser.assert.elements(LCHLaunchxrPromptResultItem, 2);
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});
			
		it('sends LCHLaunchxrPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '2');	
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});

	});

	context('exact match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'bravo');
		});

		it('filters exact', function() {
			browser.assert.elements(LCHLaunchxrPromptResultItem, 1);
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

	});

});
