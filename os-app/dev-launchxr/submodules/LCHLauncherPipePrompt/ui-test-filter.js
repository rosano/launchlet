const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPipePrompt_Filter', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPipePromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	context('no match', function () {
		
		before(function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '0');
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', 'undefined');
		});

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'charlie');
		});

		it('filters all', function() {
			browser.assert.elements(LCHLauncherResultItem, 0);
		});
		
		it('sends LCHLauncherPipePromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '1');	
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', 'undefined');
		});

	});

	context('partial match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'a');
		});

		it('filters partial', function() {
			browser.assert.elements(LCHLauncherResultItem, 2);
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});
			
		it('sends LCHLauncherPipePromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '2');	
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});

	});

	context('exact match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'bravo');
		});

		it('filters exact', function() {
			browser.assert.elements(LCHLauncherResultItem, 1);
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

	});

});
