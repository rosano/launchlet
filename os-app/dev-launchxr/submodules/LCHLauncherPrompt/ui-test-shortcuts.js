const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrPrompt_Shortcuts', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLaunchxrPromptItems: uStubStringify(uStubTwoItems()),
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
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '1');	
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('selects next item', function() {
			browser.assert.text('.OLSKCollectionItemLocus', 'bravo');
		});

		it('sends LCHLaunchxrPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '2');	
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[1]));
		});

	});

	context('ArrowUp', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('selects previous item', function() {
			browser.assert.text('.OLSKCollectionItemLocus', 'alfa');
		});

		it('sends LCHLaunchxrPromptDispatchSelect', function () {
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '3');	
			browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
		});
	
	});

	context('Escape', function () {

		before(function () {
			browser.assert.text('#TestLCHLaunchxrPromptDispatchEscape', '0');	
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('sends LCHLaunchxrPromptDispatchEscape', function () {
			browser.assert.text('#TestLCHLaunchxrPromptDispatchEscape', '1');	
		});
	
	});

});
