import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherZoneInput';
const LCHLauncherZoneInput = '.LCHLauncherZoneInput';
const LCHLauncherZoneInputHeading = '.LCHLauncherZoneInputHeading';
const LCHLauncherZoneInputPlaceholder = '.LCHLauncherZoneInputPlaceholder';

describe('LCHLauncherZoneInputDiscovery', function testLCHLauncherZoneInputDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherZoneInputHeading, 1);
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
				deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingTextDefault'));
				deepEqual(browser.query(LCHLauncherZoneInputPlaceholder).textContent, uLocalized('LCHLauncherZoneInputPlaceholderText'));
			});

			context('NameText', function () {

				it('shows inputData if filled', async function() {
					browser.fill('#LCHLauncherZoneInputTestSetNameText', 'alfa');
					await browser.wait({ element: '.LCHLauncherZoneInputHeading' });

					deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, 'alfa');
				});

				it('shows default value if empty', async function() {
					browser.fill('#LCHLauncherZoneInputTestSetNameText', '');
					await browser.wait({ element: '.LCHLauncherZoneInputHeading' });

					deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, uLocalized('LCHLauncherZoneInputHeadingTextDefault'));
				});
				
			});

			context('FilterText', function () {

				before(function() {
					browser.fill('#LCHLauncherZoneInputTestSetNameText', 'alfa');
				});

				it('shows FilterText if filled', async function() {
					browser.fill('#LCHLauncherZoneInputTestSetFilterText', 'bravo');
					await browser.wait({ element: '.LCHLauncherZoneInputHeading' });

					deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, 'BRAVO');
				});

				it('shows default value if empty', async function() {
					browser.fill('#LCHLauncherZoneInputTestSetFilterText', '');
					await browser.wait({ element: '.LCHLauncherZoneInputHeading' });
					
					deepEqual(browser.query(LCHLauncherZoneInputHeading).textContent, 'alfa');
				});
				
			});

		});
		
	});
});

describe('LCHLauncherZoneInputInteraction', function testLCHLauncherZoneInputInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
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

	context('MatchStop', function () {

		it('defaults to false', function() {
			browser.assert.hasNoClass(LCHLauncherZoneInputHeading, 'LCHLauncherZoneInputHeadingMatchStop');
		});

		it('adds class if true', async function() {
			browser.check('#LCHLauncherZoneInputTestSetMatchStop');
			await browser.wait({ element: LCHLauncherZoneInputHeading });

			browser.assert.hasClass(LCHLauncherZoneInputHeading, 'LCHLauncherZoneInputHeadingMatchStop');
		});

		it('removes class if false', async function() {
			browser.uncheck('#LCHLauncherZoneInputTestSetMatchStop');
			await browser.wait({ element: LCHLauncherZoneInputHeading });

			browser.assert.hasNoClass(LCHLauncherZoneInputHeading, 'LCHLauncherZoneInputHeadingMatchStop');
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
