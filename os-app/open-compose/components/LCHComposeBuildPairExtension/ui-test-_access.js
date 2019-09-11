import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHBuildPairExtensionPublicKeyField: '.LCHBuildPairExtensionPublicKeyField',
	LCHBuildPairExtensionSubmitButton: '.LCHBuildPairExtensionSubmitButton',
	LCHBuildPairExtensionUnpairButton: '.LCHBuildPairExtensionUnpairButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeBuildPairExtensionUIAccess', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows LCHBuildPairExtensionPublicKeyField', function() {
		browser.assert.elements(LCHBuildPairExtensionPublicKeyField, 1);
	});
	
	it('shows LCHBuildPairExtensionSubmitButton', function() {
		browser.assert.elements(LCHBuildPairExtensionSubmitButton, 1);
	});
	
	it('hides LCHBuildPairExtensionUnpairButton', function() {
		browser.assert.elements(LCHBuildPairExtensionUnpairButton, 0);
	});

	context('SubmitValid', function testSubmitValid () {
		
		before(function () {
			browser.fill(LCHBuildPairExtensionPublicKeyField, 'alfa')
			browser.click(LCHBuildPairExtensionSubmitButton)
		});
		
		it('shows LCHBuildPairExtensionUnpairButton', function() {
			browser.assert.elements(LCHBuildPairExtensionUnpairButton, 1);
		});
	
	});

});
