import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuild_Misc', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('LCHComposeBuildIncludePageRecipesField', function() {

		it('sets type', function () {
			browser.assert.attribute(LCHComposeBuildIncludePageRecipesField, 'type', 'checkbox')
		});

		it.skip('sets checked', async function () {
			browser.assert.attribute(LCHComposeBuildIncludePageRecipesField, 'checked', 'false');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestLCHComposeBuildDispatchIncludePageRecipes', '0');
				browser.assert.text('#TestLCHComposeBuildDispatchIncludePageRecipesValue', 'undefined');
			});

			before(function () {
				browser.check(LCHComposeBuildIncludePageRecipesField)
			});

			it('sends LCHComposeBuildDispatchIncludePageRecipes', function() {
				browser.assert.text('#TestLCHComposeBuildDispatchIncludePageRecipes', '1');
				browser.assert.text('#TestLCHComposeBuildDispatchIncludePageRecipesValue', 'true');
			});

		});

	});

});
