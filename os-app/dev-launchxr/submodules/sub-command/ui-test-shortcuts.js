const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherCommand_Shortcuts', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLauncherInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
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
			return browser.pressButton('#TestLauncherInvoke');
		});
		
		before(function () {
			browser.assert.elements(LCHLauncherCommand, 1);
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides LCHLauncherCommand', function () {
			browser.assert.elements(LCHLauncherCommand, 0);
		});
	
	});

});
