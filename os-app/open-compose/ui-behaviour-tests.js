import { throws, deepEqual } from 'assert';

Object.entries({
	browser: new OLSKBrowser(),
	DefaultRoutePath: '/',

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

	LCHComposeBuildLink: '#LCHComposeBuildLink',

	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	async uCreateItem (browser) {
		browser.pressButton(LCHComposeCreateButton);
		await browser.wait({ element: LCHComposeListItem });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherUITestDiscovery', function testDiscovery() {

	before(function() {
		return browser.visit(DefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHComposeCreateButton, 1);
		browser.assert.attribute(LCHComposeCreateButton, 'accesskey', 'n');

		browser.assert.elements(LCHComposeListItem, 0);
		
		browser.assert.elements(LCHComposeDetailPlaceholderContainer, 1);

		browser.assert.elements(LCHComposeDetailToolbar, 0);

		browser.assert.elements(LCHComposeBuildLink, 1);
		browser.assert.attribute(LCHComposeBuildLink, 'accesskey', 'r');

		browser.assert.elements(LCHLauncherFilterInput, 0);
	});

	it('on create', async function() {
		await uCreateItem(browser);

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
		await uCreateItem(browser);

		browser.assert.elements(LCHComposeListItem, 2);

		browser.assert.elements(LCHComposeDetailToolbar, 1);
	});

	it.skip('on run', async function() {
		browser.click(LCHComposeBuildLink);
		await browser.wait({ element: LCHLauncherFilterInput });

		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

	context('delete', function () {

		it('on cancel', async function() {
			const browser = new OLSKBrowser();

			await browser.visit(DefaultRoutePath);

			await uCreateItem(browser);

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
			const browser = new OLSKBrowser();

			await browser.visit(DefaultRoutePath);

			await uCreateItem(browser);

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
				return browser.visit(`${ languageCode }${ DefaultRoutePath }`);
			});

			it('localizes interface', function() {
				deepEqual(browser.query(LCHComposeCreateButton).title, uLocalized('LCHComposeToolbarCreateButtonText'));

				deepEqual(browser.query(LCHComposeDetailPlaceholderContainer).textContent, uLocalized('LCHComposeDetailPlaceholderText'));

				deepEqual(browser.query(LCHComposeBuildLink).textContent, 'Try it');
				deepEqual(browser.query(LCHComposeBuildLink).href.indexOf('javascript:'), 0);
				deepEqual(browser.query(LCHComposeBuildLink).href.includes('Launchlet'), true);
			});

			it('on create', async function() {
				await uCreateItem(browser);

				deepEqual(browser.query(LCHComposeListItem).textContent.trim().length, 26);

				deepEqual(browser.query(LCHComposeDetailToolbarDiscardButton).title, uLocalized('LCHComposeListItemToolbarDeleteButtonText'));

				deepEqual(browser.query(LCHComposeListItemFormInputName).placeholder, uLocalized('LCHComposeListItemFormInputNamePlaceholder'));
				deepEqual(browser.query(LCHComposeListItemFormInputName).value, '');
				deepEqual(browser.query(LCHComposeListItemFormInputInputData).placeholder, 'undefined');
				deepEqual(browser.query(LCHComposeListItemFormInputInputData).value, '');
				// editor placeholder
				// editor value
				deepEqual(browser.query(LCHComposeListItemFormInputSignature).placeholder, uLocalized('LCHComposeListItemFormInputSignaturePlaceholder'));
				deepEqual(browser.query(LCHComposeListItemFormInputSignature).value, '');
				deepEqual(browser.query(LCHComposeListItemFormInputURLFilter).placeholder, uLocalized('LCHComposeListItemFormInputURLFilterPlaceholder').replace(/\\\\/g, '\\'));
				deepEqual(browser.query(LCHComposeListItemFormInputURLFilter).value, '');

				browser.fill(LCHComposeListItemFormInputInputData, 'charlie');
				browser.fill(LCHComposeListItemFormInputURLFilter, '/https?://(.*\.)?google\.com/i');
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
				await uCreateItem(browser);

				deepEqual(browser.query(LCHComposeListItemFormInputName).value, '');
			});

			it('on select 1st item', async function() {
				browser.click(`${ LCHComposeListItem }:nth-child(2)`);
				await browser.wait({ element: LCHComposeListItem });

				deepEqual(browser.query(LCHComposeListItemFormInputName).value, 'bravo');
				deepEqual(browser.query(LCHComposeListItemFormInputSignature).value, 'alfa');
				// editor value
				deepEqual(browser.query(LCHComposeListItemFormInputInputData).value, 'charlie');
				deepEqual(browser.query(LCHComposeListItemFormInputURLFilter).value, '/https?://(.*\.)?google\.com/i');
			});

			it('on delete', async function() {
				const browser = new OLSKBrowser();

				await browser.visit(`${ languageCode }${ DefaultRoutePath }`);

				await uCreateItem(browser);

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
		return browser.visit(DefaultRoutePath);
	});

	context('on create', async function() {

		it('focuses LCHComposeListItemFormInputName', async function() {
			await uCreateItem(browser);

			deepEqual(browser.document.activeElement, browser.query(LCHComposeListItemFormInputName));
		});

	});

});
