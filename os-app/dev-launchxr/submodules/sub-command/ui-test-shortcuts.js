const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrCommand_Shortcuts', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLaunchxrInput: JSON.stringify({
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

});
