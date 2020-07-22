const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrCommand_Filter', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLaunchxrInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
		});
	});

	context('no match', function () {
		
		before(function () {
			browser.fill(LCHLaunchxrFilterInput, 'charlie');
		});

		it('filters all', function() {
			browser.assert.elements(LCHLaunchxrResultItem, 0);
		});

	});

	context('partial match', function () {

		before(function () {
			browser.fill(LCHLaunchxrFilterInput, 'a');
		});

		it('filters partial', function() {
			browser.assert.elements(LCHLaunchxrResultItem, 2);
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

	});

	context('exact match', function () {

		before(function () {
			browser.fill(LCHLaunchxrFilterInput, 'bravo');
		});

		it('filters exact', function() {
			browser.assert.elements(LCHLaunchxrResultItem, 1);
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

	});

});
