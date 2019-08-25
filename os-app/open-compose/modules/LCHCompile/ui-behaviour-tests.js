import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/';

Object.entries({
	LCHCompileEnablePipeToggle: '#LCHCompileEnablePipeToggle',

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
		browser.assert.elements(LCHCompileEnablePipeToggle, 1);
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
				browser.assert.text(`label[for=${ LCHCompileEnablePipeToggle.replace('#', '') }]`, uLocalized('LCHCompileEnablePipeToggleLabelText'))
			});

		});
		
	});

});

describe.only('LCHCompileInteraction', function testLCHCompileInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('LCHCompileEnablePipeToggle', function() {

		// let item;

		// before(async function () {
		// 	await uCreateItem(browser);

		// 	item = browser.query(LCHComposeBuildLink).href;
		// });

		// it.skip('compiles with LCHLauncherModeCommit if not checked', async function () {
		// 	browser.assert.input(LCHCompileEnablePipeToggle, 'on');
		// 	await browser.wait({ element: LCHComposeBuildLink });

		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), true);
		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), false);
		// });

		// it.skip('compiles with Pipe mode if checked', async function () {
		// 	await browser.check(LCHCompileEnablePipeToggle);
		// 	await browser.wait({ element: LCHComposeBuildLink });

		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), false);
		// 	deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), true);
		// });

		it('defaults to not checked', async function () {
			deepEqual(browser.query(LCHCompileEnablePipeToggle).checked, false)
		});

		it('binds LCHSettingCompileEnablePipe', async function () {
			await browser.check(LCHCompileEnablePipeToggle);
			deepEqual(browser.query(LCHCompileEnablePipeToggle).checked, true)

			await browser.reload();
			deepEqual(browser.query(LCHCompileEnablePipeToggle).checked, true)
		});

	});

});
