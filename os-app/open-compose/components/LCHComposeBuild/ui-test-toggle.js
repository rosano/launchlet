import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildUIToggle', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	// let item;

	// before(async function () {
	// 	await uCreateItem(browser);

	// 	item = browser.query(LCHComposeBuildAnchor).href;
	// });

	// it.skip('compiles with LCHLauncherModeCommit if not checked', async function () {
	// 	browser.assert.input(LCHComposeBuildModePipeEnabledToggle, 'on');
	// 	await browser.wait({ element: LCHComposeBuildAnchor });

	// 	deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), true);
	// 	deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), false);
	// });

	// it.skip('compiles with Pipe mode if checked', async function () {
	// 	await browser.check(LCHComposeBuildModePipeEnabledToggle);
	// 	await browser.wait({ element: LCHComposeBuildAnchor });

	// 	deepEqual(item.includes("runMode: 'kLCHLauncherModeCommit'"), false);
	// 	deepEqual(item.includes("runMode: 'kLCHLauncherModePipe'"), true);
	// });

	it('defaults to not checked', async function () {
		deepEqual(browser.query(LCHComposeBuildModePipeEnabledToggle).checked, false);
	});

	it.skip('binds LCHSettingComposeModePipeEnabled', async function () {
		await browser.check(LCHComposeBuildModePipeEnabledToggle);
		deepEqual(browser.query(LCHComposeBuildModePipeEnabledToggle).checked, true);

		await browser.reload();
		deepEqual(browser.query(LCHComposeBuildModePipeEnabledToggle).checked, true);
	});

});
