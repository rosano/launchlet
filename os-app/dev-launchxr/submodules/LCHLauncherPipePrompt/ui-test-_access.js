const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherPipePrompt: '.LCHLauncherPipePrompt',
	
	LCHLauncherPipePromptPlaceholder: '.LCHLauncherPipePromptPlaceholder',
	LCHLauncherPipePromptSelectedItem: '.LCHLauncherPipePromptSelectedItem .LCHLauncherResultItem',

	LCHLauncherFilterInput: '.LCHLauncherFilterInput',

	LCHLauncherPipePromptResultItem: '.OLSKMasterListBody .LCHLauncherResultItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherPipePrompt_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPipePromptItems: uStubStringify(uStubTwoItems()),
		});
	});

	it('shows LCHLauncherPipePrompt', function () {
		browser.assert.elements(LCHLauncherPipePrompt, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	it('shows LCHLauncherFilterInput', function () {
		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

	it('shows LCHLauncherPipePromptPlaceholder', function () {
		browser.assert.elements(LCHLauncherPipePromptPlaceholder, 1);
	});

	it('hides LCHLauncherPipePromptSelectedItem', function () {
		browser.assert.elements(LCHLauncherPipePromptSelectedItem, 0);
	});

	it('hides LCHLauncherPipePromptResultItem', function () {
		browser.assert.elements(LCHLauncherPipePromptResultItem, 0);
	});

	context('filter', function () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('hides LCHLauncherPipePromptPlaceholder', function () {
			browser.assert.elements(LCHLauncherPipePromptPlaceholder, 0);
		});

		it('shows LCHLauncherPipePromptSelectedItem', function () {
			browser.assert.elements(LCHLauncherPipePromptSelectedItem, 1);
		});

		it('shows LCHLauncherPipePromptResultItem', function () {
			browser.assert.elements(LCHLauncherPipePromptResultItem, 1);
		});
		
	});

});
