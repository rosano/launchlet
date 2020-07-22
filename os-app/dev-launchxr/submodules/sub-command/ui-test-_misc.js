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

});
