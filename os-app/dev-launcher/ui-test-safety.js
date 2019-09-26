import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherSafety', function () {

	context('AutomaticRunningOfPageRecipes', function testAutomaticRunningOfPageRecipes () {

		before(function() {
			return browser.visit(kDefaultRoute.OLSKRoutePath);
		});
		
		it('strips LCHRecipeIsAutomatic from LCHPageRecipes', async function() {
			browser.assert.input('input', '');
		});

	});

});
