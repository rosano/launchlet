import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHBuildPairExtensionPublicKeyField: '.LCHBuildPairExtensionPublicKeyField',
	LCHBuildPairExtensionSubmitButton: '.LCHBuildPairExtensionSubmitButton',
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

});
