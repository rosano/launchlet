import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher';

describe('LCHLauncherUISafety', function () {

	context('AutomaticRunningOfPageRecipes', function testAutomaticRunningOfPageRecipes () {

		before(function() {
			return browser.visit(kDefaultRoutePath);
		});
		
		it('strips LCHRecipeIsAutomatic from LCHPageFormulas', async function() {
			browser.assert.input('input', '');
		});

	});

});
