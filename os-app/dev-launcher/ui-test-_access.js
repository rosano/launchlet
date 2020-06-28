const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHLauncher: '.LCHLauncher',

	LCHLauncherFilterInput: '.LCHLauncherFilterInput',

	LCHLauncherListItem: '.OLSKResultsListItem',

	LCHLauncherPromptDotModeInput: '.LCHLauncherPromptDotModeInput',
	LCHLauncherPipeItem: '.LCHLauncherPipeItem',

	LCHLauncherSubjectPrompt: '.LCHLauncherSubjectPrompt',
	LCHLauncherSubjectPromptHeading: '.LCHLauncherSubjectPrompt .LCHLauncherPromptHeading',
	LCHLauncherSubjectPromptPlaceholder: '.LCHLauncherSubjectPromptPlaceholder',
	LCHLauncherSubjectPromptItemSelected: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',

	LCHLauncherActionPrompt: '.LCHLauncherActionPrompt',
	LCHLauncherActionPromptHeading: '.LCHLauncherActionPrompt .LCHLauncherPromptHeading',
	LCHLauncherActionPromptItemSelected: '.LCHLauncherActionPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
	
	LCHLauncherObjectPrompt: '.LCHLauncherObjectPrompt',
	LCHLauncherObjectPromptHeading: '.LCHLauncherObjectPrompt .LCHLauncherPromptHeading',
	LCHLauncherObjectPromptItemSelected: '.LCHLauncherObjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',

	uStubTwoItems () {
		return [
			{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {
					return document.querySelector('.TestRecipeOutput').value = 'alfa';
				},
			},
			{
				LCHRecipeName: 'bravo',
				LCHRecipeCallback: function () {
					return document.querySelector('.TestRecipeOutput').value = 'bravo';
				},
			},
		];
	},

	uStubStringify (inputData) {
		return JSON.stringify(inputData.map(function (e) {
			return Object.assign(e, {
				LCHRecipeCallback: `(${ e.LCHRecipeCallback.toString() })`,
				LCHRecipeIsExcluded: e.LCHRecipeIsExcluded ? `(${ e.LCHRecipeIsExcluded.toString() })` : undefined,
			});
		}));
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncher_AccessCommit', function test_LCHLauncher_AccessCommit () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			LCHOptionMode: 'LCHModeCommit',
		});
	});

	it('shows LCHLauncher', function() {
		browser.assert.elements(LCHLauncher, 1)
	});

	it('shows LCHLauncherFilterInput', function() {
		browser.assert.elements(LCHLauncherFilterInput, 1)
	});

	it('hides LCHLauncherListItem', function() {
		browser.assert.elements(LCHLauncherListItem, 0)
	});

	it('hides LCHLauncherPromptDotModeInput', function() {
		browser.assert.elements(LCHLauncherPromptDotModeInput, 0)
	});

	it('hides LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0)
	});

	context('filter', function () {

		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'a');
		});

		it('shows LCHLauncherListItem', function() {
			browser.assert.elements(LCHLauncherListItem, 2)
		});
	
	});

});

describe('LCHLauncherAccess_Preview', function test_LCHLauncher_AccessPreview () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			LCHOptionMode: 'LCHModePreview',
		});
	});

	it('shows LCHLauncher', function() {
		browser.assert.elements(LCHLauncher, 1)
	});

	it('shows LCHLauncherFilterInput', function() {
		browser.assert.elements(LCHLauncherFilterInput, 1)
	});

	it('shows LCHLauncherListItem', function() {
		browser.assert.elements(LCHLauncherListItem, 2)
	});

	it('hides LCHLauncherPromptDotModeInput', function() {
		browser.assert.elements(LCHLauncherPromptDotModeInput, 0)
	});

	it('hides LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0)
	});

});

describe('LCHLauncher_AccessPipe', function test_LCHLauncher_AccessPipe () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			LCHOptionMode: 'LCHModePipe',
		});
	});

	it('shows LCHLauncher', function() {
		browser.assert.elements(LCHLauncher, 1)
	});

	it('hides LCHLauncherFilterInput', function() {
		browser.assert.elements(LCHLauncherFilterInput, 0)
	});

	it('hides LCHLauncherPromptDotModeInput', function() {
		browser.assert.elements(LCHLauncherPromptDotModeInput, 0)
	});

	it('shows LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1)
	});

	it('hides LCHLauncherListItem', function() {
		browser.assert.elements(LCHLauncherListItem, 0)
	});

	it('hides OLSKResultsList', function() {
		browser.assert.elements('.OLSKResultsList', 0)
	});

	it('hides OLSKResultsListItem', function() {
		browser.assert.elements('.OLSKResultsListItem', 0)
	});

	it('hides LCHLauncherPipeItem', function() {
		browser.assert.elements(LCHLauncherPipeItem, 0)
	});

	it('spec pipe elements')

});
