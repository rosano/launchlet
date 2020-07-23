const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherCommand_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLauncherInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
		});
	});

	it('classes LCHLauncher', function () {
		browser.assert.hasClass(LCHLauncherCommand, 'LCHLauncher');
	});	

	describe('LCHLauncherFilterInput', function test_LCHLauncherFilterInput () {
		
		it('sets autofocus', function () {
			browser.assert.attribute(LCHLauncherFilterInput, 'autofocus', '');
		});
		
	});

	describe('LCHLauncherResultItem', function test_LCHLauncherResultItem () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.input('#TestRecipeOutput', '');
			});

			before(function () {
				return browser.click(LCHLauncherResultItem);
			});

			it('runs callback', function () {
				browser.assert.input('#TestRecipeOutput', 'alfa');	
			});
		
		});
		
	});

});
