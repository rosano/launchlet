import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHLauncherRoute.OLSKRoutePath;

describe('LCHLauncherUISafety', function () {

	context('AutomaticRunningOfPageRecipes', function testAutomaticRunningOfPageRecipes () {

		before(function() {
			return browser.visit(kDefaultRoutePath);
		});
		
		it('strips LCHRecipeIsAutomatic from LCHPageRecipes', async function() {
			browser.assert.input('input', '');
		});

	});

});
