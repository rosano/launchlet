import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

describe('LCHComposeSafety', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('Edit', async function testEdit() {

		before(function () {
			return uCreateItem(browser);
		});

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

		it('adds alert if LCHDocumentArgs flagged', async function() {
			browser.fill(LCHComposeFormArgsField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);
		});

		it('removes alert if LCHDocumentArgs  not flagged', async function() {
			browser.fill(LCHComposeFormArgsField, 'alfa');
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

});
