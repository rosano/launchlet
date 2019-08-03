import { throws, deepEqual } from 'assert';

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000);

Object.entries({
	LCHComposeCreateButton: '#LCHComposeCreateButton',

	LCHComposeListItem: '.ListItem',

	LCHComposeDetailPlaceholderContainer: '.PlaceholderContainer',

	LCHComposeDetailToolbar: '#LCHComposeDetailToolbar',
	LCHComposeDetailToolbarBackButton: '#LCHComposeDetailToolbarBackButton',

	LCHComposeDetailToolbarDiscardButton: '#LCHComposeDetailToolbarDiscardButton',

	LCHComposeListItemFormInputName: '#LCHComposeListItemFormInputName',
	LCHComposeListItemFormInputInputData: '#LCHComposeListItemFormInputInputData',
	LCHComposeListItemFormInputSignature: '#LCHComposeListItemFormInputSignature',
	LCHComposeListItemFormInputURLFilter: '#LCHComposeListItemFormInputURLFilter',

	LCHComposeReloadButton: '#LCHComposeReloadButton',

	async uCreateFormula (browser) {
		browser.pressButton(LCHComposeCreateButton);
		await browser.wait({ element: LCHComposeListItem });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const browser = new Browser();

describe('LCHLauncherUITestDiscovery', function testDiscovery() {

	context('LCHLauncherModeDefault', function () {

		before(function() {
			return browser.visit('/');
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHComposeCreateButton, 1);

			browser.assert.elements(LCHComposeListItem, 0);
			
			browser.assert.elements(LCHComposeDetailPlaceholderContainer, 1);

			browser.assert.elements(LCHComposeDetailToolbar, 0);
		});

		it('on create', async function() {
			await uCreateFormula(browser);

			browser.assert.elements(LCHComposeListItem, 1);

			browser.assert.elements(LCHComposeDetailPlaceholderContainer, 0);

			browser.assert.elements(LCHComposeDetailToolbar, 1);
			browser.assert.elements(LCHComposeDetailToolbarDiscardButton, 1);

			browser.assert.elements(LCHComposeListItemFormInputName, 1);
			browser.assert.elements(LCHComposeListItemFormInputInputData, 1);
			// editor
			browser.assert.elements(LCHComposeListItemFormInputSignature, 1);
			browser.assert.elements(LCHComposeListItemFormInputURLFilter, 1);
		});

	});

});

describe('LCHLauncherUITestLanguage', function testLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(`${ languageCode }/`);
			});

			it('localizes interface', function() {
				deepEqual(browser.query(LCHComposeCreateButton).title, uLocalized('LCHComposeToolbarCreateButtonText'));

				deepEqual(browser.query(LCHComposeDetailPlaceholderContainer).textContent, uLocalized('LCHComposeDetailPlaceholderText'));
			});

			it('on create', async function() {
				await uCreateFormula(browser);

				// browser.assert.elements(LCHComposeListItem, 1);

				// deepEqual(browser.query(LCHComposeDetailToolbarBackButton).title, uLocalized('LCHComposeDetailToolbarBackButtonText'));
				deepEqual(browser.query(LCHComposeDetailToolbarDiscardButton).title, uLocalized('LCHComposeListItemToolbarDeleteButtonText'));

				deepEqual(browser.query(LCHComposeListItemFormInputName).placeholder, uLocalized('LCHComposeListItemFormInputNamePlaceholder'));
				deepEqual(browser.query(LCHComposeListItemFormInputInputData).placeholder, 'undefined');
				// editor
				deepEqual(browser.query(LCHComposeListItemFormInputSignature).placeholder, uLocalized('LCHComposeListItemFormInputSignaturePlaceholder'));
			});

		});
		
	});
});
