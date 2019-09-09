import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

describe('LCHComposeUIFeature', function () {

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
