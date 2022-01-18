const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLaunchxrPrompt: '.LCHLaunchxrPrompt',
	
	LCHLaunchxrPromptPlaceholder: '.LCHLaunchxrPromptPlaceholder',
	LCHLaunchxrPromptSelectedItem: '.LCHLaunchxrPromptSelectedItem .LCHLauncherResultItem',

	LCHLauncherFilterInput: '.LCHLauncherFilterInput',

	LCHLaunchxrPromptResultItem: '.OLSKNarrowBody .LCHLauncherResultItem',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('LCHLaunchxrPrompt_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLaunchxrPromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	it('shows LCHLaunchxrPrompt', function () {
		browser.assert.elements(LCHLaunchxrPrompt, 1);
	});

	it('shows OLSKNarrow', function () {
		browser.assert.elements('.OLSKNarrow', 1);
	});

	it('shows LCHLauncherFilterInput', function () {
		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

	it('shows LCHLaunchxrPromptPlaceholder', function () {
		browser.assert.elements(LCHLaunchxrPromptPlaceholder, 1);
	});

	it('hides LCHLaunchxrPromptSelectedItem', function () {
		browser.assert.elements(LCHLaunchxrPromptSelectedItem, 0);
	});

	it('hides LCHLaunchxrPromptResultItem', function () {
		browser.assert.elements(LCHLaunchxrPromptResultItem, 0);
	});

	context('filter', function () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides LCHLaunchxrPromptPlaceholder', function () {
			browser.assert.elements(LCHLaunchxrPromptPlaceholder, 0);
		});

		it('shows LCHLaunchxrPromptSelectedItem', function () {
			browser.assert.elements(LCHLaunchxrPromptSelectedItem, 1);
		});

		it('shows LCHLaunchxrPromptResultItem', function () {
			browser.assert.elements(LCHLaunchxrPromptResultItem, 1);
		});
		
	});

});
