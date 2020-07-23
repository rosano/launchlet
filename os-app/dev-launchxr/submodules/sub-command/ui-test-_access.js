const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherCommand: '.LCHLauncherCommand',

	LCHLauncherFilterInput: '.LCHLauncherFilterInput',

	LCHLauncherResultItem: '.LCHLauncherResultItem',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LCHLauncherCommand_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			TestLauncherInput: uStubStringifyAll({
				LCHOptionRecipes: uStubTwoItems(),
			}),
		});
	});

	it('shows LCHLauncherCommand', function () {
		browser.assert.elements(LCHLauncherCommand, 1);
	});

	it('shows LCHLauncherFilterInput', function () {
		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	context('select', function () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		before(function () {
			return browser.click(LCHLauncherResultItem);
		});

		it('hides LCHLauncherCommand', function () {
			browser.assert.elements(LCHLauncherCommand, 0);
		});
		
	});

});
