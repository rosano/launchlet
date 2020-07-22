const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrCommand_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLaunchxrInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
		});
	});

	it('classes LCHLaunchxr', function () {
		browser.assert.hasClass(LCHLaunchxrCommand, 'LCHLaunchxr');
	});	

	describe('LCHLaunchxrFilterInput', function test_LCHLaunchxrFilterInput () {
		
		it('sets autofocus', function () {
			browser.assert.attribute(LCHLaunchxrFilterInput, 'autofocus', '');
		});
		
	});

	describe('LCHLaunchxrFilterInput', function test_LCHLaunchxrFilterInput () {
		
		before(function () {
			return browser.fill(LCHLaunchxrFilterInput, 'alfa');
		});

		before(function () {
			browser.assert.input('.TestRecipeOutput', '');
		});

		before(function () {
			return browser.click(LCHLaunchxrResultItem);
		});

		it('runs callback', function () {
			browser.assert.input('.TestRecipeOutput', 'alfa');	
		});
		
	});

});
