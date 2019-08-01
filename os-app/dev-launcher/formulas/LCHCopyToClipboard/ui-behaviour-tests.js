import { throws, deepEqual } from 'assert';

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000);

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHLauncherListItem: '.ListItem',

	LCHCopyToClipboardButton: '#LCHCopyToClipboardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const browser = new Browser();

describe('LCHCopyToClipboardUITestDiscovery', function testDiscovery() {

	before(function() {
		return browser.visit('/launcher?loadModules=LCHCopyToClipboard');
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

});

describe('LCHCopyToClipboardUITestLanguage', function testLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit('/launcher?loadModules=LCHCopyToClipboard');
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

