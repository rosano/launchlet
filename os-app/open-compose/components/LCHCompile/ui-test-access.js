import { deepEqual } from 'assert';

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

describe('LCHCompileUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHCompileModePipeEnabledToggle, 1);
	});

});
