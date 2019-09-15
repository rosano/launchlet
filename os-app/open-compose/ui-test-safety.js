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

		it('adds alert if LCHDocumentArgs flagged', async function() {
			browser.fill(LCHComposeFormArgsField, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);
		});

		it('removes alert if LCHDocumentArgs  not flagged', async function() {
			browser.fill(LCHComposeFormArgsField, '');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

		it('adds alert if LCHDocumentBody flagged', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'eval');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);
		});

		it('removes alert if LCHDocumentBody  not flagged', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, '');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 0);
		});

	});

});
