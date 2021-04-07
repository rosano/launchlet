const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPrompt_Shortcuts', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	before(function () {
		return browser.fill(LCHLauncherFilterInput, 'a');
	});

	before(function () {
		browser.assert.text('.OLSKCollectionItemLocus', 'alfa');
	});

	context('ArrowDown', function () {
			
		before(function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '1');	
			browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('selects next item', function() {
			browser.assert.text('.OLSKCollectionItemLocus', 'bravo');
		});

		it('sends LCHLauncherPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '2');	
			browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[1]));
		});

	});

	context('ArrowUp', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('selects previous item', function() {
			browser.assert.text('.OLSKCollectionItemLocus', 'alfa');
		});

		it('sends LCHLauncherPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '3');	
			browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});
	
	});

	context('Escape', function () {

		before(function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchEscape', '0');	
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('sends LCHLauncherPromptDispatchEscape', function () {
			browser.assert.text('#TestLCHLauncherPromptDispatchEscape', '1');	
		});
	
	});

});
