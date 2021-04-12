const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherPrompt: '.LCHLauncherPrompt',
	
	LCHLauncherPromptPlaceholder: '.LCHLauncherPromptPlaceholder',
	LCHLauncherPromptSelectedItem: '.LCHLauncherPromptSelectedItem .LCHLauncherResultItem',

	LCHLauncherFilterInput: '.LCHLauncherFilterInput',

	LCHLauncherPromptResultItem: '.OLSKNarrowBody .LCHLauncherResultItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherPrompt_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	it('shows LCHLauncherPrompt', function () {
		browser.assert.elements(LCHLauncherPrompt, 1);
	});

	it('shows OLSKNarrow', function () {
		browser.assert.elements('.OLSKNarrow', 1);
	});

	it('shows LCHLauncherFilterInput', function () {
		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

	it('shows LCHLauncherPromptPlaceholder', function () {
		browser.assert.elements(LCHLauncherPromptPlaceholder, 1);
	});

	it('hides LCHLauncherPromptSelectedItem', function () {
		browser.assert.elements(LCHLauncherPromptSelectedItem, 0);
	});

	it('hides LCHLauncherPromptResultItem', function () {
		browser.assert.elements(LCHLauncherPromptResultItem, 0);
	});

	context('filter', function () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides LCHLauncherPromptPlaceholder', function () {
			browser.assert.elements(LCHLauncherPromptPlaceholder, 0);
		});

		it('shows LCHLauncherPromptSelectedItem', function () {
			browser.assert.elements(LCHLauncherPromptSelectedItem, 1);
		});

		it('shows LCHLauncherPromptResultItem', function () {
			browser.assert.elements(LCHLauncherPromptResultItem, 1);
		});
		
	});

});
