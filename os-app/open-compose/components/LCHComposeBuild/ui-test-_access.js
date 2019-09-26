import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeBuildModePipeEnabledToggle: '#LCHComposeBuildModePipeEnabledToggle',
	LCHComposeBuildPairButton: '.LCHComposeBuildPairButton',
	LCHComposeBuildPairExtension: '.LCHComposeBuildPairExtension',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeBuild_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows LCHComposeBuildModePipeEnabledToggle', function() {
		browser.assert.elements(LCHComposeBuildModePipeEnabledToggle, 1);
	});
	
	it('shows LCHComposeBuildPairButton', function() {
		browser.assert.elements(LCHComposeBuildPairButton, 1);
	});

	context('ClickPairButton', function () {
		
		before(function () {
			browser.click(LCHComposeBuildPairButton)
			return browser.wait({ elements: LCHComposeBuildPairExtension })
		});
		
		it('hides LCHComposeBuildPairButton', function() {
			browser.assert.elements(LCHComposeBuildPairButton, 0);
		});
	
		it('shows LCHComposeBuildPairExtension', function() {
			browser.assert.elements(LCHComposeBuildPairExtension, 1);
		});
	
	});

});
