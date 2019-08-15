import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/';

Object.entries({
	LCHComposeCreateButton: '#LCHComposeCreateButton',

	LCHComposeListItem: '.ListItem',

	LCHComposeDetailPlaceholderContainer: '.PlaceholderContainer',

	LCHComposeDetailToolbar: '#LCHComposeDetailToolbar',
	LCHComposeDetailToolbarBackButton: '#LCHComposeDetailToolbarBackButton',

	LCHComposeDetailToolbarDiscardButton: '#LCHComposeDetailToolbarDiscardButton',

	LCHComposeDetailFormContainer: '.FormContainer',
	LCHComposeListItemFormInputName: '#LCHComposeListItemFormInputName',
	LCHComposeListItemFormInputInputData: '#LCHComposeListItemFormInputInputData',
	LCHComposeDetailCallbackBodyInput: '.LCHComposeDetailCallbackBody .CodeMirror',
	LCHComposeDetailCallbackBodyInputDebug: '#LCHComposeDetailCallbackBodyInputDebug',
	LCHComposeListItemFormInputSignature: '#LCHComposeListItemFormInputSignature',
	LCHComposeListItemFormInputURLFilter: '#LCHComposeListItemFormInputURLFilter',
	LCHComposeListItemFormInputIsAutomatic: '#LCHComposeListItemFormInputIsAutomatic',
	LCHComposeDetailStyleInput: '.LCHComposeDetailStyle .CodeMirror',
	LCHComposeDetailStyleInputDebug: '#LCHComposeDetailStyleInputDebug',

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

describe('LCHComposeDiscovery', function testLCHComposeDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHComposeCreateButton, 1);
		browser.assert.attribute(LCHComposeCreateButton, 'accesskey', 'n');

		browser.assert.elements(LCHComposeListItem, 0);
		
		browser.assert.elements(LCHComposeDetailPlaceholderContainer, 1);

		browser.assert.elements(LCHComposeDetailToolbar, 0);
		browser.assert.elements(LCHComposeDetailFormContainer, 0);

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

		browser.assert.elements(LCHComposeDetailFormContainer, 1);
		browser.assert.elements(LCHComposeListItemFormInputName, 1);
		browser.assert.elements(LCHComposeListItemFormInputInputData, 1);
		browser.assert.elements(LCHComposeDetailCallbackBodyInput, 1);
		browser.assert.elements(LCHComposeDetailCallbackBodyInputDebug, 1);
		browser.assert.elements(LCHComposeListItemFormInputSignature, 1);
		browser.assert.elements(LCHComposeListItemFormInputURLFilter, 1);
		browser.assert.elements(LCHComposeListItemFormInputIsAutomatic, 0);
		browser.assert.elements(LCHComposeDetailStyleInput, 1);
		browser.assert.elements(LCHComposeDetailStyleInputDebug, 1);
	});

	it('on create nth item', async function() {
		await uCreateItem(browser);

		browser.assert.elements(LCHComposeListItem, 2);

		browser.assert.elements(LCHComposeDetailToolbar, 1);
	});

	it('on fill LCHRecipeURLFilter', async function() {
		browser.fill(LCHComposeListItemFormInputURLFilter, 'alfa');
		await browser.wait({ element: LCHComposeListItemFormInputIsAutomatic });

		browser.assert.elements(LCHComposeListItemFormInputIsAutomatic, 1);
	});

	it('on empty LCHRecipeURLFilter', async function() {
		browser.fill(LCHComposeListItemFormInputURLFilter, '');
		await browser.wait({ element: LCHComposeListItemFormInputIsAutomatic });

		browser.assert.elements(LCHComposeListItemFormInputIsAutomatic, 0);
	});

	it.skip('on run', async function() {
		browser.click(LCHComposeBuildLink);
		await browser.wait({ element: LCHLauncherFilterInput });

		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

	context('delete', function () {

		it('on cancel', async function() {
			await browser.OLSKConfirm(async function () {
				browser.pressButton(LCHComposeDetailToolbarDiscardButton);
			}, function (dialog) {
				dialog.response = false;

				return dialog;
			});

			await browser.wait({ element: LCHComposeListItem });

			browser.assert.elements(LCHComposeDetailPlaceholderContainer, 0);

			browser.assert.elements(LCHComposeDetailToolbar, 1);
		});

		it('on confirm', async function() {
			await browser.OLSKConfirm(async function () {
				browser.pressButton(LCHComposeDetailToolbarDiscardButton);
			});

			await browser.wait({ element: LCHComposeListItem });

			browser.assert.elements(LCHComposeDetailPlaceholderContainer, 1);

			browser.assert.elements(LCHComposeDetailToolbar, 0);
		});
		
	});

});

describe('LCHComposeLanguage', function testLCHComposeLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(`${ languageCode }${ kDefaultRoutePath }`);
			});

			it('localizes interface', function() {
				browser.assert.attribute(LCHComposeCreateButton, 'title', uLocalized('LCHComposeToolbarCreateButtonText'));

				browser.assert.text(LCHComposeDetailPlaceholderContainer, uLocalized('LCHComposeDetailPlaceholderText'));

				browser.assert.text(LCHComposeBuildLink, 'Try it');
				// deepEqual(browser.query(LCHComposeBuildLink).href.slice(0, 11), 'javascript:');
				// deepEqual(item.href.includes('Launchlet'), true);
			});

			it('on create', async function() {
				await uCreateItem(browser);

				deepEqual(browser.query(LCHComposeListItem).textContent.trim().length, 26);

				browser.assert.attribute(LCHComposeDetailToolbarDiscardButton, 'title', uLocalized('LCHComposeListItemToolbarDeleteButtonText'));

				browser.assert.attribute(LCHComposeListItemFormInputName, 'placeholder', uLocalized('LCHComposeListItemFormInputNamePlaceholder'));
				browser.assert.input(LCHComposeListItemFormInputName, '');
				browser.assert.attribute(LCHComposeListItemFormInputInputData, 'placeholder', 'undefined');
				browser.assert.input(LCHComposeListItemFormInputInputData, '');
				browser.assert.text(`${ LCHComposeDetailCallbackBodyInput } .CodeMirror-placeholder`, uLocalized('LCHComposeListItemFormInputFunctionBodyPlaceholder'));
				// editor value
				browser.assert.input(LCHComposeDetailCallbackBodyInputDebug, '');
				browser.assert.attribute(LCHComposeListItemFormInputSignature, 'placeholder', uLocalized('LCHComposeListItemFormInputSignaturePlaceholder'));
				browser.assert.input(LCHComposeListItemFormInputSignature, '');
				browser.assert.attribute(LCHComposeListItemFormInputURLFilter, 'placeholder', uLocalized('LCHComposeListItemFormInputURLFilterPlaceholder').replace(/\\\\/g, '\\'));
				browser.assert.input(LCHComposeListItemFormInputURLFilter, '');
				browser.assert.text(`${ LCHComposeDetailStyleInput } .CodeMirror-placeholder`, uLocalized('LCHComposeListItemFormInputCSSPlaceholder'));
				browser.assert.input(LCHComposeDetailStyleInputDebug, '');

				browser.fill(LCHComposeListItemFormInputInputData, 'charlie');
				browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'delta');
				browser.fill(LCHComposeDetailStyleInputDebug, 'echo');
			});

			it('on fill LCHRecipeURLFilter', async function() {
				browser.fill(LCHComposeListItemFormInputURLFilter, 'alfa');
				await browser.wait({ element: LCHComposeListItemFormInputIsAutomatic });

				browser.assert.text(`label[for='${ LCHComposeListItemFormInputIsAutomatic.replace('#', '') }']`, uLocalized('LCHComposeListItemFormInputIsAutomaticText'));

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

				browser.assert.input(LCHComposeListItemFormInputName, '');
				browser.assert.input(LCHComposeDetailCallbackBodyInputDebug, '');
				browser.assert.input(LCHComposeDetailStyleInputDebug, '');
			});

			it('on select 1st item', async function() {
				browser.click(`${ LCHComposeListItem }:nth-child(2)`);
				await browser.wait({ element: LCHComposeListItem });

				browser.assert.input(LCHComposeListItemFormInputName, 'bravo');
				browser.assert.input(LCHComposeListItemFormInputSignature, 'alfa');
				// editor value
				browser.assert.input(LCHComposeDetailCallbackBodyInputDebug, 'delta');
				browser.assert.input(LCHComposeListItemFormInputInputData, 'charlie');
				browser.assert.input(LCHComposeListItemFormInputURLFilter, '/https?://(.*\.)?google\.com/i');
				browser.assert.input(LCHComposeDetailStyleInputDebug, 'echo');
			});

			it('on delete', async function() {
				deepEqual((await browser.OLSKConfirm(async function () {
					browser.pressButton(LCHComposeDetailToolbarDiscardButton);
				})).question, uLocalized('LCHComposeListItemDeletePromptText'));
			});

		});
		
	});

});

describe('LCHComposeDiscovery', function testLCHComposeDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('on create', async function() {

		it('focuses LCHComposeListItemFormInputName', async function() {
			await uCreateItem(browser);

			deepEqual(browser.document.activeElement, browser.query(LCHComposeListItemFormInputName));
		});

	});

});
