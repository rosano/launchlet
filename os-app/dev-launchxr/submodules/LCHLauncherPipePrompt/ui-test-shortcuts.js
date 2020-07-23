const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPipePrompt_Shortcuts', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPipePromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	before(function () {
		return browser.fill(LCHLauncherFilterInput, 'a');
	});

	before(function () {
		browser.assert.text('.OLSKResultsListItemSelected', 'alfa');
	});

	context('ArrowDown', function () {
			
		before(function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '1');	
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('selects next item', function() {
			browser.assert.text('.OLSKResultsListItemSelected', 'bravo');
		});

		it('sends LCHLauncherPipePromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '2');	
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[1]));
		});

	});

	context('ArrowUp', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('selects previous item', function() {
			browser.assert.text('.OLSKResultsListItemSelected', 'alfa');
		});

		it('sends LCHLauncherPipePromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '3');	
			browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});
	
	});

	context('Escape', function () {

		before(function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchEscape', '0');	
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('sends LCHLauncherPipePromptDispatchEscape', function () {
			browser.assert.text('#TestLCHLauncherPipePromptDispatchEscape', '1');	
		});
	
	});

});
