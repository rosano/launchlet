import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeBuildModePipeEnabledToggle: '#LCHComposeBuildModePipeEnabledToggle',
	LCHComposeBuildPairButton: '.LCHComposeBuildPairButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeBuildUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows LCHComposeBuildModePipeEnabledToggle', function() {
		browser.assert.elements(LCHComposeBuildModePipeEnabledToggle, 1);
	});
	
	it('shows LCHComposeBuildPairButton', function() {
		browser.assert.elements(LCHComposeBuildPairButton, 1);
	});

});
