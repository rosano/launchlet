const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncherPipePrompt: '.LCHLauncherPipePrompt',

	LCHLauncherFilterInput: '.LCHLauncherFilterInput',

	LCHLauncherResultItem: '.LCHLauncherResultItem',
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

	it('shows LCHLauncherFilterInput', function () {
		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	it('hides LCHLauncherResultItem', function () {
		browser.assert.elements(LCHLauncherResultItem, 0);
	});

	context('filter', function () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});

		it('shows LCHLauncherResultItem', function () {
			browser.assert.elements(LCHLauncherResultItem, 1);
		});
		
	});

	context('select', function () {
		
		before(function () {
			return browser.click(LCHLauncherResultItem);
		});

		it('hides LCHLauncherCommand', function () {
			browser.assert.elements(LCHLauncherCommand, 0);
		});
		
	});

});
