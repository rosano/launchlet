import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompileUIFeature', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
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
