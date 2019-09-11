import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionUIForm', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('SubmitInvalid', function testSubmitInvalid () {
		
		before(function () {
			browser.click(LCHBuildPairExtensionSubmitButton)
			return browser.wait({ elements: LCHBuildPairExtensionErrorAlert })
		});
	
		it('shows LCHBuildPairExtensionErrorAlert', function() {
			browser.assert.elements(LCHBuildPairExtensionErrorAlert, 1);
		});
	
	});

	context('SubmitValid', function testSubmitValid () {
		
		before(function () {
			browser.fill(LCHBuildPairExtensionPublicKeyField, ' alfa ') // #spec trim
			browser.click(LCHBuildPairExtensionSubmitButton)
			return browser.wait({ elements: LCHBuildPairExtensionErrorAlert })
		});
	
		it('hides LCHBuildPairExtensionErrorAlert', function() {
			browser.assert.elements(LCHBuildPairExtensionErrorAlert, 0);
		});
		
		it('hides LCHBuildPairExtensionPublicKeyField', function() {
			browser.assert.elements(LCHBuildPairExtensionPublicKeyField, 0);
		});
		
		it('hides LCHBuildPairExtensionSubmitButton', function() {
			browser.assert.elements(LCHBuildPairExtensionSubmitButton, 0);
		});
	
	});

});
