import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uStringWithFormat = OLSKTestingStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHCompose_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
		}));
	});

	it('localizes title', function() {
		browser.assert.text('title', uLocalized('LCHComposeTitle'))
	});

	it('localizes LCH_SHARED_DONATE_URL', function() {
		browser.assert.element(`a[href="${ process.env.LCH_SHARED_DONATE_URL }"]`);
	});

	it('localizes interface', function() {
		browser.assert.attribute(LCHComposeFilterInput, 'placeholder', uLocalized('LCHComposeFilterInputPlaceholderText'));
		browser.assert.attribute(LCHComposeCreateButton, 'title', uLocalized('LCHComposeToolbarCreateButtonText'));

		browser.assert.text(LCHComposeDetailPlaceholderContainer, uLocalized('LCHComposeDetailPlaceholderText'));

		browser.assert.text(LCHComposeBuildAnchor, 'Try it');
		// deepEqual(browser.query(LCHComposeBuildAnchor).href.slice(0, 11), 'javascript:');
		// deepEqual(item.href.includes('Launchlet'), true);
	});

	it('on create', async function() {
		await uCreateItem(browser);

		deepEqual(browser.query(LCHComposeListItem).textContent.trim().length, 26);

		browser.assert.attribute(LCHComposeDetailToolbarCloneButton, 'title', uLocalized('LCHComposeListItemToolbarCloneButtonText'));
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

		browser.fill(LCHComposeFormURLFilterField, '/https?://(.*\.)?example\.com/i');
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
		browser.assert.input(LCHComposeFormURLFilterField, '/https?://(.*\.)?example\.com/i');
		browser.assert.input(LCHComposeDetailStyleInputDebug, 'echo');
	});

	it('on delete', async function() {
		deepEqual((await browser.OLSKConfirm(async function () {
			browser.pressButton(LCHComposeDetailToolbarDiscardButton);
		})).question, uLocalized('LCHComposeListItemDeletePromptText'));
	});

	it('on flag', async function() {
		await uCreateItem(browser);

		browser.fill(LCHComposeFormNameField, 'charlie');
		browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'eval');
		await browser.wait({ element: '.LCHComposeListItemFlagged' });

		deepEqual(browser.query('.LCHComposeListItemFlagged').textContent.trim(), uStringWithFormat(uLocalized('LCHComposeListItemNameFlaggedFormat'), 'charlie'));
		browser.assert.text(LCHComposeFormFlagAlert, uLocalized('LCHComposeFormFlagAlertText'));
	});

	it('on syntax error', async function() {
		browser.fill(LCHComposeDetailCallbackBodyInputDebug, '');
		await browser.wait({ element: LCHComposeFormFlagAlert });
		
		browser.assert.elements(LCHComposeFormFlagAlert, 0)

		browser.fill(LCHComposeDetailCallbackBodyInputDebug, '{');
		await browser.wait({ element: LCHComposeFormFlagAlert });
		
		browser.assert.elements(LCHComposeFormFlagAlert, 1)

		browser.assert.text(LCHComposeFormFlagAlert, 'Unexpected token (1:18)');
	});

});

});
