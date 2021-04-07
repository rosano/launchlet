const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherCommand_Filter', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLauncherInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
		});
	});

	context('no match', function () {
		
		before(function () {
			browser.fill(LCHLauncherFilterInput, 'charlie');
		});

		it('filters all', function() {
			browser.assert.elements(LCHLauncherResultItem, 0);
		});

	});

	context('partial match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'a');
		});

		it('filters partial', function() {
			browser.assert.elements(LCHLauncherResultItem, 2);
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

	});

	context('exact match', function () {

		before(function () {
			browser.fill(LCHLauncherFilterInput, 'bravo');
		});

		it('filters exact', function() {
			browser.assert.elements(LCHLauncherResultItem, 1);
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

	});

});
