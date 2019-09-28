import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeSafety', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('Master', async function testMaster() {

		before(function () {
			return uCreateItem(browser);
		});

		it('adds class if flagged', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.hasClass(LCHComposeListItem, 'LCHComposeListItemFlagged');
		});

		it('removes class if not flagged', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, '');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.attribute(LCHComposeListItem, 'ListItem');
		});

	});

	context('Detail', async function testDetail() {

		it('adds no alert if LCHDocumentName flagged', async function() {
			browser.fill(LCHComposeFormNameField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds no alert if LCHDocumentSignature flagged', async function() {
			browser.fill(LCHComposeFormSignatureField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds no alert if LCHDocumentArgs flagged', async function() {
			browser.fill(LCHComposeFormArgsField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds no alert if LCHDocumentInputTypes flagged', async function() {
			browser.fill(LCHComposeFormInputTypesField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds alert if LCHDocumentBody flagged', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);
		})

		it('removes alert if LCHDocumentBody not flagged', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, '');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds alert if LCHDocumentBody contains syntax error', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, '{');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);
		})

		it('removes alert if LCHDocumentBody contains no syntax error', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, '');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds no alert if LCHDocumentOutputType flagged', async function() {
			browser.fill(LCHComposeFormOutputTypeField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds alert if LCHDocumentCanonicalExampleBody flagged', async function() {
			browser.fill(LCHComposeFormOutputTypeField, 'Bool');
			await browser.wait({ element: LCHComposeFormCanonicalExampleBodyDebugField });

			browser.fill(LCHComposeFormCanonicalExampleBodyDebugField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);
		});

		it('removes alert if LCHDocumentCanonicalExampleBody not flagged', async function() {
			browser.fill(LCHComposeFormCanonicalExampleBodyDebugField, '');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds no alert if LCHDocumentStyle flagged', async function() {
			browser.fill(LCHComposeDetailStyleInputDebug, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds no alert if LCHDocumentURLFilter flagged', async function() {
			browser.fill(LCHComposeFormURLFilterField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

	});

	context('Build', async function testBuild() {

		before(function () {
			browser.fill(LCHComposeFormArgsField, '');
			browser.fill(LCHComposeFormInputTypesField, '');
			browser.fill(LCHComposeFormOutputTypeField, '');
			browser.fill(LCHComposeFormURLFilterField, '');
		});

		it('ignores if flagged', async function() {
			await uCreateItem(browser);

			browser.fill(LCHComposeFormNameField, 'eval2');
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);

			browser.click(LCHComposeBuildAnchor);
			await browser.wait({ element: '#LCHLauncherFilterInput' });

			browser.fill('#LCHLauncherFilterInput', 'e');
			await browser.wait({ element: '.LCHLauncherResultListItem' });

			browser.assert.elements('.LCHLauncherResultListItem', 1)
		});

		it('flags if invalid', async function() {
			await uCreateItem(browser);

			browser.fill(LCHComposeFormNameField, 'eval3');
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'LCH_TEST_FLAG_ON_BUILD');

			browser.click(LCHComposeBuildAnchor);
			await browser.wait({ element: '#LCHLauncherFilterInput' });

			browser.fill('#LCHLauncherFilterInput', 'e');
			await browser.wait({ element: '.LCHLauncherResultListItem' });

			browser.assert.elements('.LCHLauncherResultListItem', 1)
		});

	});

});
