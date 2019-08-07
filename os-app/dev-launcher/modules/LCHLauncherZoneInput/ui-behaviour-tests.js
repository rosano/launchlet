import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherZoneInput';
const LCHLauncherZoneInput = '.LCHLauncherZoneInput';
const LCHLauncherZoneInputName = '.LCHLauncherZoneInputName';
const LCHLauncherZoneInputPlaceholder = '.LCHLauncherZoneInputPlaceholder';

describe('LCHLauncherZoneInputDiscovery', function testLCHLauncherZoneInputDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherZoneInputName, 1);
		browser.assert.elements(LCHLauncherZoneInputPlaceholder, 1);
	});

});

describe('LCHLauncherZoneInputLanguage', function testLCHLauncherZoneInputLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(kDefaultRoutePath);
			});

			it('on startup', function() {
				deepEqual(browser.query(LCHLauncherZoneInputName).textContent, 'Undefined');
				// deepEqual(browser.query(LCHLauncherZoneInputPlaceholder).textContent, uLocalized('LCHLauncherZoneInputPlaceholderText'));
				deepEqual(browser.query(LCHLauncherZoneInputPlaceholder).textContent, 'Type to search');
			});

		});
		
	});
});

describe('LCHLauncherZoneInputInteraction', function testLCHLauncherZoneInputInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('nameText', function () {

		it('shows inputData if filled', async function() {
			browser.pressButton('#LCHLauncherZoneInputTestSetNameTextFilled');
			await browser.wait({ element: '.LCHLauncherZoneInputName' });

			deepEqual(browser.query(LCHLauncherZoneInputName).textContent, 'alfa');
		});

		it('shows default value if empty', async function() {
			browser.pressButton('#LCHLauncherZoneInputTestSetNameTextEmpty');
			await browser.wait({ element: '.LCHLauncherZoneInputName' });

			deepEqual(browser.query(LCHLauncherZoneInputName).textContent, 'Undefined');
		});
		
	});

	context('isSelected', function () {

		it('defaults to false', function() {
			browser.assert.hasNoClass(LCHLauncherZoneInput, 'LCHLauncherZoneInputSelected');
		});

		it('adds class if true', async function() {
			browser.pressButton('#LCHLauncherZoneInputTestSelect');
			await browser.wait({ element: '.LCHLauncherZoneInputSelected' });

			browser.assert.hasClass(LCHLauncherZoneInput, 'LCHLauncherZoneInputSelected');
		});
		
	});

	context('didClick', function () {

		it('runs callback on click', async function() {
			deepEqual(browser.query('#LCHLauncherZoneInputTestClick').textContent, '0');

			browser.click(LCHLauncherZoneInput);
			await browser.wait({ element: '.LCHLauncherZoneInputSelected' });

			deepEqual(browser.query('#LCHLauncherZoneInputTestClick').textContent, '1');
		});
		
	});

});
