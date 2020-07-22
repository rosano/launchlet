const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLaunchxrCommand: '.LCHLaunchxrCommand',

	LCHLaunchxrFilterInput: '.LCHLaunchxrFilterInput',

	LCHLaunchxrResultItem: '.LCHLaunchxrResultItem',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LCHLaunchxrCommand_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLaunchxrInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
		});
	});

	it('shows LCHLaunchxrCommand', function () {
		browser.assert.elements(LCHLaunchxrCommand, 1);
	});

	it('shows LCHLaunchxrFilterInput', function () {
		browser.assert.elements(LCHLaunchxrFilterInput, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

});
