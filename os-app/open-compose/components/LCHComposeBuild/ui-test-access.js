import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeBuildModePipeEnabledToggle: '#LCHComposeBuildModePipeEnabledToggle',

	async uCreateItem (browser) {
		browser.pressButton(LCHComposeCreateButton);
		await browser.wait({ element: LCHComposeListItem });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeBuildUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHComposeBuildModePipeEnabledToggle, 1);
	});

});
