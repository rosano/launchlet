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

describe('LCHCompileInteraction', function testLCHCompileInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context.skip('LCHCompileEnablePipeToggle', function() {

		let item;

		before(async function () {
			await uCreateItem(browser);

			item = browser.query(LCHComposeBuildLink).href;
		});

		it('compiles with LCHLauncherModeCommit if not checked', function () {
			browser.assert.input(LCHCompileEnablePipeToggle, 'false');

			deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), true);
			deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), false);
		});

		it('compiles with Pipe mode if checked', async function () {
			await browser.check(LCHCompileEnablePipeToggle);


			deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), false);
			deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), true);
		});

	});

});
