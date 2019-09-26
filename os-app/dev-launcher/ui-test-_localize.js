import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHLauncherRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uStringWithFormat = OLSKTestingStringWithFormat;
const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHLauncherLocalizeCommit-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }?runMode=kRunModeCommit`);
	});

	context('Startup', function testCommitStartup() {

		it('localizes LCHLauncherInputPlaceholder', function() {
			deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
		});
		
	});

});

describe(`LCHLauncherLocalizePreview-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }?runMode=kRunModePreview`);
	});

	context('Startup', function testPreviewStartup() {

		it('localizes LCHLauncherInputPlaceholder', function() {
			deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderPreview'));
		});
		
	});

	it('clears filter on Escape', async function() { // #move:feature
		browser.fill(LCHLauncherFilterInput, 'a');
		await browser.wait({element: LCHLauncherListItem});

		browser.assert.input(LCHLauncherFilterInput, 'a');
		
		browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		await browser.wait({element: LCHLauncherFilterInput});

		browser.assert.input(LCHLauncherFilterInput, '');
	});

});

describe(`LCHLauncherLocalizePipe-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }?runMode=kRunModePipe`);
	});

	context('Startup', function testPipeStartup() {

		it('localizes LCHLauncherSubjectPromptHeading', function() {
			browser.text(LCHLauncherSubjectPromptHeading), uLocalized('LCHLauncherSubjectPromptHeadingText');
		});

		it('localizes LCHLauncherSubjectPromptPlaceholder', function() {
			browser.text(LCHLauncherSubjectPromptPlaceholder), uLocalized('LCHLauncherSubjectPromptPlaceholderText');
		});

		it('localizes LCHLauncherActionPromptHeading', function() {
			browser.text(LCHLauncherActionPromptHeading), uLocalized('LCHLauncherActionPromptHeadingText');
		});
		
	});

	context('Keydown', function testPipeKeydown() {

		before(async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
			await browser.wait({element: LCHLauncherSubjectPromptHeading});
		});

		it('fills LCHLauncherSubjectPromptHeading', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
		});
		
	});

	context('KeydownBackspace', function testPipeKeydownBackspace() {

		before(async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			await browser.wait({element: LCHLauncherSubjectPromptHeading});
		});

		it('resets LCHLauncherSubjectPromptHeading', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, uLocalized('LCHLauncherSubjectPromptHeadingText'));
		});
		
	});

});

describe(`LCHLauncherLocalizeShared-${ languageCode }`, function () { // #move:feature

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
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
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LCHLauncherTestURLFilter`);
		});

		it('runs tasks', async function() {
			await browser.wait({element: LCHLauncherFilterInput});

			browser.assert.input('#LCHLauncherTestInputSingleLine', 'zebra');
		});

	});

	context('LCHLauncherTestStyle', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LCHLauncherTestStyle`);
		});

		it('shows url specific item', async function() {
			browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestStyle');
			await browser.wait({element: LCHLauncherListItem});

			browser.click(LCHLauncherListItem);

			browser.assert.text('body style', 'body { background: red; }');
		});

	});

	// #purge
	// context('LCHLauncherTestConvertTypeServiceSearch', function () {

	// 	before(function() {
	// 		return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LCHLauncherTestConvertTypeServiceSearch`);
	// 	});

	// 	it('converts recipe', async function() {
	// 		browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestConvertTypeServiceSearch');
	// 		await browser.wait({element: LCHLauncherListItem});

	// 		browser.assert.text(LCHLauncherListItem, uStringWithFormat(uLocalized('LCHLauncherTestConvertTypeServiceSearchTextFormat'), 'LCHLauncherTestConvertTypeServiceSearch'));
	// 	});

	// });

});

});
