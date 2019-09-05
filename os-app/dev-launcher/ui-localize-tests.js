import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHLauncherRoute.OLSKRoutePath;

describe('LCHLauncherUILocalize', function () {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			const uStringWithFormat = OLSKTestingStringWithFormat;

			context('shared', function () {

				before(function() {
					return browser.visit(kDefaultRoutePath);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
				});

				it('on filter', async function() {
					browser.fill(LCHLauncherFilterInput, 'a');
					await browser.wait({element: LCHLauncherListItem});

					browser.assert.text(`${ LCHLauncherListItem }:first-child`, 'Alfa');
				});

				it('shows _LCHRecipeSource for LCHPageRecipes', async function() {
					browser.fill(LCHLauncherFilterInput, 'h');
					await browser.wait({element: LCHLauncherListItem});

					browser.assert.text(`${ LCHLauncherListItem }:first-child`, 'Hello loc.tests');
				});

				it('skips LCHPageRecipes tasks', async function() {
					await browser.wait({element: LCHLauncherFilterInput});

					browser.assert.input('#LCHLauncherTestInputSingleLine', '');
				});

				context('LCHLauncherTestURLFilter', function () {

					before(function() {
						return browser.visit(`${ kDefaultRoutePath }?LCHLauncherTestURLFilter`);
					});

					it('runs tasks', async function() {
						await browser.wait({element: LCHLauncherFilterInput});

						browser.assert.input('#LCHLauncherTestInputSingleLine', 'zebra');
					});

				});

				context('LCHLauncherTestStyle', function () {

					before(function() {
						return browser.visit(`${ kDefaultRoutePath }?LCHLauncherTestStyle`);
					});

					it('shows url specific item', async function() {
						browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestStyle');
						await browser.wait({element: LCHLauncherListItem});

						browser.click(LCHLauncherListItem);

						browser.assert.text('body style', 'body { background: red; }');
					});

				});

				context.skip('LCHLauncherTestConvertTypeServiceSearch', function () {

					before(function() {
						return browser.visit(`${ kDefaultRoutePath }?LCHLauncherTestConvertTypeServiceSearch`);
					});

					it('converts recipe', async function() {
						browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestConvertTypeServiceSearch');
						await browser.wait({element: LCHLauncherListItem});

						browser.assert.text(LCHLauncherListItem, uStringWithFormat(uLocalized('LCHLauncherTestConvertTypeServiceSearchTextFormat'), 'LCHLauncherTestConvertTypeServiceSearch'));
					});

				});

			});

			context('LCHLauncherModePreview', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=kRunModePreview`);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderPreview'));
				});

				it('clears filter on Escape', async function() {
					browser.fill(LCHLauncherFilterInput, 'a');
					await browser.wait({element: LCHLauncherListItem});

					browser.assert.input(LCHLauncherFilterInput, 'a');
					
					browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
					await browser.wait({element: LCHLauncherFilterInput});

					browser.assert.input(LCHLauncherFilterInput, '');
				});

			});

			context('LCHLauncherModePipe', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=kRunModePipe`);
				});

				it('on startup', function() {
					browser.text(LCHLauncherSubjectPromptHeading), uLocalized('LCHLauncherSubjectPromptHeadingText');
					browser.text(LCHLauncherSubjectPromptPlaceholder), uLocalized('LCHLauncherSubjectPromptPlaceholderText');

					browser.text(LCHLauncherActionPromptHeading), uLocalized('LCHLauncherActionPromptHeadingText');
				});

				it('on keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherSubjectPromptHeading});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
				});
				
				it('on keydown Backspace', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherSubjectPromptHeading});
					
					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, uLocalized('LCHLauncherSubjectPromptHeadingText'));
				});

			});

		});
		
	});
});
