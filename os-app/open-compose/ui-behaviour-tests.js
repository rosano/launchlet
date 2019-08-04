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

	it('on create nth item', async function() {
		await uCreateFormula(browser);

		browser.assert.elements(LCHComposeListItem, 2);

		browser.assert.elements(LCHComposeDetailToolbar, 1);
	});

	context('delete', function () {

		it('on cancel', async function() {
			const browser = new Browser();

			await browser.visit('/');

			await uCreateFormula(browser);

			await new Promise(async function (resolve, reject) {
				browser.on('confirm', function (dialog) {
					dialog.response = false;

					return resolve(dialog);
				});

				browser.pressButton(LCHComposeDetailToolbarDiscardButton);
				await browser.wait({ element: LCHComposeListItem });
			});

			await browser.wait({ element: LCHComposeListItem });

			browser.assert.elements(LCHComposeDetailPlaceholderContainer, 0);

			browser.assert.elements(LCHComposeDetailToolbar, 1);
		});

		it('on confirm', async function() {
			const browser = new Browser();

			await browser.visit('/');

			await uCreateFormula(browser);

			await new Promise(async function (resolve, reject) {
				browser.on('confirm', function (dialog) {
					return resolve(dialog);
				});

				browser.pressButton(LCHComposeDetailToolbarDiscardButton);
				await browser.wait({ element: LCHComposeListItem });
			});

			await browser.wait({ element: LCHComposeListItem });

			browser.assert.elements(LCHComposeDetailPlaceholderContainer, 1);

			browser.assert.elements(LCHComposeDetailToolbar, 0);
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

				deepEqual(browser.query(LCHComposeListItem).textContent.trim().length, 26);

				// deepEqual(browser.query(LCHComposeDetailToolbarBackButton).title, uLocalized('LCHComposeDetailToolbarBackButtonText'));
				deepEqual(browser.query(LCHComposeDetailToolbarDiscardButton).title, uLocalized('LCHComposeListItemToolbarDeleteButtonText'));

				deepEqual(browser.query(LCHComposeListItemFormInputName).placeholder, uLocalized('LCHComposeListItemFormInputNamePlaceholder'));
				deepEqual(browser.query(LCHComposeListItemFormInputName).value, '');
				deepEqual(browser.query(LCHComposeListItemFormInputInputData).placeholder, 'undefined');
				deepEqual(browser.query(LCHComposeListItemFormInputInputData).value, '');
				// editor
				deepEqual(browser.query(LCHComposeListItemFormInputSignature).placeholder, uLocalized('LCHComposeListItemFormInputSignaturePlaceholder'));
				deepEqual(browser.query(LCHComposeListItemFormInputSignature).value, '');

				browser.fill(LCHComposeListItemFormInputInputData, 'charlie');
			});

			it('on edit signature', async function() {
				browser.fill(LCHComposeListItemFormInputSignature, 'alfa');
				await browser.wait({ element: LCHComposeListItem });

				deepEqual(browser.query(LCHComposeListItem).textContent.trim(), 'alfa');
			});

			it('on edit name', async function() {
				browser.fill(LCHComposeListItemFormInputName, 'bravo');
				await browser.wait({ element: LCHComposeListItem });

				deepEqual(browser.query(LCHComposeListItem).textContent.trim(), 'bravo');
			});

			it('on create nth item', async function() {
				await uCreateFormula(browser);

				deepEqual(browser.query(LCHComposeListItemFormInputName).value, '');
			});

			it('on select 1st item', async function() {
				browser.click(`${ LCHComposeListItem }:nth-child(2)`);
				await browser.wait({ element: LCHComposeListItem });

				deepEqual(browser.query(LCHComposeListItemFormInputName).value, 'bravo');
				deepEqual(browser.query(LCHComposeListItemFormInputSignature).value, 'alfa');
				deepEqual(browser.query(LCHComposeListItemFormInputInputData).value, 'charlie');
			});

			it('on delete', async function() {
				const browser = new Browser();

				await browser.visit(`${ languageCode }/`);

				await uCreateFormula(browser);

				deepEqual((await new Promise(async function (resolve, reject) {
					browser.on('confirm', function (dialog) {
						resolve(dialog);
					});

					browser.pressButton(LCHComposeDetailToolbarDiscardButton);
					await browser.wait({ element: LCHComposeListItem });
				})).question, uLocalized('LCHComposeListItemDeletePromptText'));
			});

		});
		
	});

});

describe('LCHLauncherUITestDiscovery', function testDiscovery() {

	before(function() {
		return browser.visit('/');
	});

	context('on create', async function() {

		it('focuses LCHComposeListItemFormInputName', async function() {
			await uCreateFormula(browser);

			deepEqual(browser.document.activeElement, browser.query(LCHComposeListItemFormInputName));
		});

	});

});
