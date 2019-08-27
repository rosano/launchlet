import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

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
	LCHComposeFormCanonicalExampleBodyField: '.LCHComposeFormCanonicalExampleBody .CodeMirror',
	LCHComposeFormCanonicalExampleBodyDebugField: '#LCHComposeFormCanonicalExampleBodyDebugField',
	LCHComposeDetailStyleInput: '.LCHComposeDetailStyle .CodeMirror',
	LCHComposeDetailStyleInputDebug: '#LCHComposeDetailStyleInputDebug',
	LCHComposeFormURLFilterField: '#LCHComposeFormURLFilterField',
	LCHComposeFormIsAutomaticField: '#LCHComposeFormIsAutomaticField',


	LCHComposeBuildLink: '#LCHComposeBuildLink',

	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	async uCreateItem (browser) {
		browser.pressButton(LCHComposeCreateButton);
		await browser.wait({ element: LCHComposeListItem });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeUIAccess', function () {

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
		browser.assert.elements(LCHComposeFormCanonicalExampleBodyField, 0);
		browser.assert.elements(LCHComposeFormCanonicalExampleBodyDebugField, 0);
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
		
		it('shows LCHComposeFormCanonicalExampleBodyField if Bool', async function() {
			browser.fill(LCHComposeFormOutputTypeField, 'Bool');
			await browser.wait({ element: LCHComposeFormCanonicalExampleBodyField });

			browser.assert.elements(LCHComposeFormCanonicalExampleBodyField, 1);
			browser.assert.elements(LCHComposeFormCanonicalExampleBodyDebugField, 1);
		});

		it('hides LCHComposeFormCanonicalExampleBodyField', async function() {
			browser.fill(LCHComposeFormOutputTypeField, 'alfa');
			await browser.wait({ element: LCHComposeFormCanonicalExampleBodyField });

			browser.assert.elements(LCHComposeFormCanonicalExampleBodyField, 0);
			browser.assert.elements(LCHComposeFormCanonicalExampleBodyDebugField, 0);
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