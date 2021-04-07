const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPrompt_Filter', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	context('no match', function () {
		
		before(function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '0');
			browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', 'undefined');
		});

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'charlie');
		});

		it('filters all', function() {
			browser.assert.elements(LCHLauncherPromptResultItem, 0);
		});
		
		it('sends LCHLauncherPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '1');	
			browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', 'undefined');
		});

	});

	context('partial match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'a');
		});

		it('filters partial', function() {
			browser.assert.elements(LCHLauncherPromptResultItem, 2);
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});
			
		it('sends LCHLauncherPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '2');	
			browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});

	});

	context('exact match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'bravo');
		});

		it('filters exact', function() {
			browser.assert.elements(LCHLauncherPromptResultItem, 1);
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

	});

});
