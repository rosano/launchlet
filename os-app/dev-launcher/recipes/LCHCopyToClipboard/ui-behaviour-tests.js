import { deepEqual } from 'assert';


const browser = new OLSKBrowser();
Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHCopyToClipboardButton: '#LCHCopyToClipboardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const kDefaultRoutePath = '/launcher?loadRecipes=LCHCopyToClipboard';

describe('LCHCopyToClipboardUITestDiscovery', function testDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHCopyToClipboardButton, 0);
	});

	it('on run', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHCopyToClipboardTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHCopyToClipboardButton});

		browser.assert.elements(LCHCopyToClipboardButton, 1);
	});

	it('on click', async function() {
		browser.pressButton(LCHCopyToClipboardButton);
		await browser.wait({element: LCHLauncherListItem});

		browser.assert.elements(LCHCopyToClipboardButton, 0);
	});

});

describe('LCHCopyToClipboardUITestLanguage', function testLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(kDefaultRoutePath);
			});

			it('on run', async function() {
				browser.fill(LCHLauncherFilterInput, 'LCHCopyToClipboardTest');
				await browser.wait({element: LCHLauncherListItem});

				browser.click(LCHLauncherListItem);
				await browser.wait({element: LCHCopyToClipboardButton});

				deepEqual(browser.query(LCHCopyToClipboardButton).textContent, uLocalized('LCHCopyToClipboardButtonText'));
			});

		});
		
	});
});

describe('LCHCopyToClipboardUITestInteraction', function testInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('focuses button', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHCopyToClipboardTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHCopyToClipboardButton});

		deepEqual(browser.document.activeElement, browser.query(LCHCopyToClipboardButton));
	});
	
	it.skip('closes on click', async function() {
		browser.pressButton(LCHCopyToClipboardButton);
		await browser.wait({element: LCHCopyToClipboardButton});

		browser.assert.elements(LCHLauncherFilterInput, 0);
	});

});
