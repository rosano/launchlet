import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('../../controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

Object.entries({
	LCHCompileModePipeEnabledToggle: '#LCHCompileModePipeEnabledToggle',

	async uCreateItem (browser) {
		browser.pressButton(LCHComposeCreateButton);
		await browser.wait({ element: LCHComposeListItem });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHCompileDiscovery', function testLCHCompileDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHCompileModePipeEnabledToggle, 1);
	});

});

describe('LCHCompileLanguage', function testLCHCompileLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(`${ languageCode }${ kDefaultRoutePath }`);
			});

			it('localizes interface', function() {
				browser.assert.text(`label[for=${ LCHCompileModePipeEnabledToggle.replace('#', '') }]`, uLocalized('LCHCompileModePipeEnabledToggleLabelText'));
			});

		});
		
	});

});

describe('LCHCompileInteraction', function testLCHCompileInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('LCHCompileModePipeEnabledToggle', function() {

		// let item;

		// before(async function () {
		// 	await uCreateItem(browser);

		// 	item = browser.query(LCHComposeBuildLink).href;
		// });

		// it.skip('compiles with LCHLauncherModeCommit if not checked', async function () {
		// 	browser.assert.input(LCHCompileModePipeEnabledToggle, 'on');
		// 	await browser.wait({ element: LCHComposeBuildLink });

		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), true);
		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), false);
		// });

		// it.skip('compiles with Pipe mode if checked', async function () {
		// 	await browser.check(LCHCompileModePipeEnabledToggle);
		// 	await browser.wait({ element: LCHComposeBuildLink });

		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), false);
		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), true);
		// });

		it('defaults to not checked', async function () {
			deepEqual(browser.query(LCHCompileModePipeEnabledToggle).checked, false);
		});

		it.skip('binds LCHSettingComposeModePipeEnabled', async function () {
			await browser.check(LCHCompileModePipeEnabledToggle);
			deepEqual(browser.query(LCHCompileModePipeEnabledToggle).checked, true);

			await browser.reload();
			deepEqual(browser.query(LCHCompileModePipeEnabledToggle).checked, true);
		});

	});

});
