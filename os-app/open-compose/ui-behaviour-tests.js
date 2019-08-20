import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/';

Object.entries({
	LCHComposeFilterInput: '.LCHComposeFilterInput',
	OLSKInputWrapperClearButton: '.OLSKInputWrapperClearButton',

	LCHComposeCreateButton: '#LCHComposeCreateButton',

	LCHComposeListItem: '.ListItem',

	LCHComposeDetailPlaceholderContainer: '.PlaceholderContainer',

	LCHComposeDetailToolbar: '#LCHComposeDetailToolbar',
	LCHComposeDetailToolbarBackButton: '#LCHComposeDetailToolbarBackButton',

	LCHComposeDetailToolbarDiscardButton: '#LCHComposeDetailToolbarDiscardButton',

	LCHComposeDetailFormContainer: '.FormContainer',
	LCHComposeFormNameField: '#LCHComposeFormNameField',
	LCHComposeFormSignatureField: '#LCHComposeFormSignatureField',
	LCHComposeFormInputTypesField: '#LCHComposeFormInputTypesField',
	LCHComposeFormArgsField: '#LCHComposeFormArgsField',
	LCHComposeDetailCallbackBodyInput: '.LCHComposeDetailCallbackBody .CodeMirror',
	LCHComposeDetailCallbackBodyInputDebug: '#LCHComposeDetailCallbackBodyInputDebug',
	LCHComposeFormOutputTypeField: '#LCHComposeFormOutputTypeField',
	LCHComposeFormOutputTypeCanonicalExampleBodyField: '.LCHComposeFormOutputTypeCanonicalExampleBody .CodeMirror',
	LCHComposeFormOutputTypeCanonicalExampleBodyDebugField: '#LCHComposeFormOutputTypeCanonicalExampleBodyDebugField',
	LCHComposeDetailStyleInput: '.LCHComposeDetailStyle .CodeMirror',
	LCHComposeDetailStyleInputDebug: '#LCHComposeDetailStyleInputDebug',
	LCHComposeFormURLFilterField: '#LCHComposeFormURLFilterField',
	LCHComposeFormIsAutomaticField: '#LCHComposeFormIsAutomaticField',

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
		browser.assert.elements(LCHComposeFilterInput, 1);

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
		browser.assert.elements(LCHComposeFormNameField, 1);
		browser.assert.elements(LCHComposeFormInputTypesField, 0);
		browser.assert.elements(LCHComposeFormArgsField, 1);
		browser.assert.elements(LCHComposeDetailCallbackBodyInput, 1);
		browser.assert.elements(LCHComposeDetailCallbackBodyInputDebug, 1);
		browser.assert.elements(LCHComposeFormOutputTypeField, 1);
		browser.assert.elements(LCHComposeFormOutputTypeCanonicalExampleBodyField, 0);
		browser.assert.elements(LCHComposeFormOutputTypeCanonicalExampleBodyDebugField, 0);
		browser.assert.elements(LCHComposeFormSignatureField, 1);
		browser.assert.elements(LCHComposeFormURLFilterField, 1);
		browser.assert.elements(LCHComposeFormIsAutomaticField, 0);
		browser.assert.elements(LCHComposeDetailStyleInput, 1);
		browser.assert.elements(LCHComposeDetailStyleInputDebug, 1);
	});

	it('on create nth item', async function() {
		await uCreateItem(browser);

		browser.assert.elements(LCHComposeListItem, 2);

		browser.assert.elements(LCHComposeDetailToolbar, 1);
	});

	it('on fill LCHDocumentArgs', async function() {
		browser.fill(LCHComposeFormArgsField, 'alfa');
		await browser.wait({ element: LCHComposeFormInputTypesField });

		browser.assert.elements(LCHComposeFormInputTypesField, 1);
	});

	it('on empty LCHDocumentArgs', async function() {
		browser.fill(LCHComposeFormArgsField, '');
		await browser.wait({ element: LCHComposeFormInputTypesField });

		browser.assert.elements(LCHComposeFormInputTypesField, 0);
	});

	context.skip('LCHComposeFormOutputTypeField', function () {
		
		it('shows LCHComposeFormOutputTypeCanonicalExampleBodyField if Bool', async function() {
			browser.fill(LCHComposeFormOutputTypeField, 'Bool');
			await browser.wait({ element: LCHComposeFormOutputTypeCanonicalExampleBodyField });

			browser.assert.elements(LCHComposeFormOutputTypeCanonicalExampleBodyField, 1);
			browser.assert.elements(LCHComposeFormOutputTypeCanonicalExampleBodyDebugField, 1);
		});

		it('hides LCHComposeFormOutputTypeCanonicalExampleBodyField', async function() {
			browser.fill(LCHComposeFormOutputTypeField, 'alfa');
			await browser.wait({ element: LCHComposeFormOutputTypeCanonicalExampleBodyField });

			browser.assert.elements(LCHComposeFormOutputTypeCanonicalExampleBodyField, 0);
			browser.assert.elements(LCHComposeFormOutputTypeCanonicalExampleBodyDebugField, 0);
		});
	
	});

	it('on fill LCHRecipeURLFilter', async function() {
		browser.fill(LCHComposeFormURLFilterField, 'alfa');
		await browser.wait({ element: LCHComposeFormIsAutomaticField });

		browser.assert.elements(LCHComposeFormIsAutomaticField, 1);
	});

	it('on empty LCHRecipeURLFilter', async function() {
		browser.fill(LCHComposeFormURLFilterField, '');
		await browser.wait({ element: LCHComposeFormIsAutomaticField });

		browser.assert.elements(LCHComposeFormIsAutomaticField, 0);
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
				browser.assert.attribute(LCHComposeFilterInput, 'placeholder', uLocalized('LCHComposeFilterInputPlaceholderText'))
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

				browser.assert.attribute(LCHComposeFormNameField, 'placeholder', uLocalized('LCHComposeFormNameFieldPlaceholderText'));
				browser.assert.input(LCHComposeFormNameField, '');
				browser.assert.attribute(LCHComposeFormArgsField, 'placeholder', 'undefined');
				browser.assert.input(LCHComposeFormArgsField, '');
				browser.assert.text(`${ LCHComposeDetailCallbackBodyInput } .CodeMirror-placeholder`, uLocalized('LCHComposeFormScriptFieldPlaceholderText'));
				// editor value
				browser.assert.input(LCHComposeDetailCallbackBodyInputDebug, '');
				browser.assert.attribute(LCHComposeFormSignatureField, 'placeholder', uLocalized('LCHComposeFormSignatureFieldPlaceholderText'));
				browser.assert.input(LCHComposeFormSignatureField, '');
				browser.assert.attribute(LCHComposeFormURLFilterField, 'placeholder', uLocalized('LCHComposeFormURLFilterFieldPlaceholderText').replace(/\\\\/g, '\\'));
				browser.assert.input(LCHComposeFormURLFilterField, '');
				browser.assert.text(`${ LCHComposeDetailStyleInput } .CodeMirror-placeholder`, uLocalized('LCHComposeFormStyleFieldPlaceholderText'));
				browser.assert.input(LCHComposeDetailStyleInputDebug, '');

				browser.fill(LCHComposeFormArgsField, 'charlie');
				browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'delta');
				browser.fill(LCHComposeDetailStyleInputDebug, 'echo');
			});

			it('on fill LCHRecipeURLFilter', async function() {
				browser.fill(LCHComposeFormURLFilterField, 'alfa');
				await browser.wait({ element: LCHComposeFormIsAutomaticField });

				browser.assert.text(`label[for='${ LCHComposeFormIsAutomaticField.replace('#', '') }']`, uLocalized('LCHComposeFormIsAutomaticFieldLabelText'));

				browser.fill(LCHComposeFormURLFilterField, '/https?://(.*\.)?google\.com/i');
			});

			it('on edit signature', async function() {
				browser.fill(LCHComposeFormSignatureField, 'alfa');
				await browser.wait({ element: LCHComposeListItem });

				deepEqual(browser.query(LCHComposeListItem).textContent.trim(), 'alfa');
			});

			it('on edit name', async function() {
				browser.fill(LCHComposeFormNameField, 'bravo');
				await browser.wait({ element: LCHComposeListItem });

				deepEqual(browser.query(LCHComposeListItem).textContent.trim(), 'bravo');
			});

			it('on create nth item', async function() {
				await uCreateItem(browser);

				browser.assert.input(LCHComposeFormNameField, '');
				browser.assert.input(LCHComposeDetailCallbackBodyInputDebug, '');
				browser.assert.input(LCHComposeDetailStyleInputDebug, '');
			});

			it('on select 1st item', async function() {
				browser.click(`${ LCHComposeListItem }:nth-child(2)`);
				await browser.wait({ element: LCHComposeListItem });

				browser.assert.input(LCHComposeFormNameField, 'bravo');
				browser.assert.input(LCHComposeFormSignatureField, 'alfa');
				// editor value
				browser.assert.input(LCHComposeDetailCallbackBodyInputDebug, 'delta');
				browser.assert.input(LCHComposeFormArgsField, 'charlie');
				browser.assert.input(LCHComposeFormURLFilterField, '/https?://(.*\.)?google\.com/i');
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

describe('LCHComposeBehaviourInteraction', function testLCHComposeBehaviourInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('on startup', function() {

		it.skip('focuses LCHComposeFilterInput', function() {
			// deepEqual(browser.document.hasFocus(LCHComposeFilterInput), true); #mysterious
			deepEqual(browser.document.activeElement, browser.query(LCHComposeFilterInput));
		});

	});

	context('on create', async function() {

		it('focuses LCHComposeFormNameField', async function() {
			await uCreateItem(browser);

			deepEqual(browser.document.activeElement, browser.query(LCHComposeFormNameField));
		});

	});

	context('on filter', function () {
		
		before(async function() {
			await browser.visit(kDefaultRoutePath);

			await uCreateItem(browser);
			browser.fill(LCHComposeFormNameField, 'alfa');

			await uCreateItem(browser);
			browser.fill(LCHComposeFormNameField, 'bravo');
		});

		it('presents no items if no match', async function() {
			browser.fill(LCHComposeFilterInput, 'test');
			await browser.wait({ element: OLSKInputWrapperClearButton });

			browser.assert.elements(LCHComposeListItem, 0);
		});

		it('presents items if match', async function() {
			browser.fill(LCHComposeFilterInput, 'alfa');
			await browser.wait({ element: OLSKInputWrapperClearButton });

			browser.assert.elements(LCHComposeListItem, 1);
		});

		context('on click OLSKInputWrapperClearButton', function() {

			before(async function() {
				browser.pressButton(OLSKInputWrapperClearButton);
				await browser.wait({ element: `${LCHComposeListItem}:nth-child(2)` });
			});

			it('clears LCHComposeFilterInput', function() {
				browser.assert.input(LCHComposeFilterInput, '');
			});

			it('shows all items', function() {
				browser.assert.elements(LCHComposeListItem, 2);
			});

		});

		context('on Escape', function() {

			before(async function() {
				browser.fill(LCHComposeFilterInput, 'test');
				await browser.wait({ element: OLSKInputWrapperClearButton });

				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('clears LCHComposeFilterInput', function() {
				browser.assert.input(LCHComposeFilterInput, '');
			});

			it('shows all items', function() {
				browser.assert.elements(LCHComposeListItem, 2);
			});

		});

	});

	context('on Escape', function() {

		before(async function () {
			await browser.visit(kDefaultRoutePath);

			await uCreateItem(browser);

			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('focuses LCHComposeFilterInput', function() {
			// deepEqual(browser.document.hasFocus(LCHComposeFilterInput), true); #mysterious
			deepEqual(browser.document.activeElement, browser.query(LCHComposeFilterInput));
		});

	});

});
