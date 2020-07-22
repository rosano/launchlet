const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrCommand_Shortcuts', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLaunchxrInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
		});
	});

	before(function () {
		return browser.fill(LCHLaunchxrFilterInput, 'a');
	});

	before(function () {
		browser.assert.text('.OLSKResultsListItemSelected', 'alfa');
	});

	context('ArrowDown', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('selects next item', function() {
			browser.assert.text('.OLSKResultsListItemSelected', 'bravo');
		});

	});

	context('ArrowUp', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('selects previous item', function() {
			browser.assert.text('.OLSKResultsListItemSelected', 'alfa');
		});
	
	});

	context('Enter', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
		});

		it('runs callback', function () {
			browser.assert.input('#TestRecipeOutput', 'alfa');	
		});
	
	});

	context('Escape', function () {
		
		before(function () {
			return browser.pressButton('#TestLaunchxrInvoke');
		});
		
		before(function () {
			browser.assert.elements(LCHLaunchxrCommand, 1);
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides LCHLaunchxrCommand', function () {
			browser.assert.elements(LCHLaunchxrCommand, 0);
		});
	
	});

});
