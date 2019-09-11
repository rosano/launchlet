import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionUIForm', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('SubmitInvalid', function testSubmitInvalid () {

		let didAlert = false;

		before(function () {
			return browser.OLSKAlert(function () {
				browser.pressButton(LCHBuildPairExtensionSubmitButton)
			}, function () {
				didAlert = true;
			});
		});
	
		it('alerts', function() {
			deepEqual(didAlert, true);
		});
	
	});

	context('SubmitValid', function testSubmitValid () {
		
		before(function () {
			browser.fill(LCHBuildPairExtensionPublicKeyField, ' alfa ') // #spec trim
			browser.click(LCHBuildPairExtensionSubmitButton)
		});
		
		it('hides LCHBuildPairExtensionPublicKeyField', function() {
			browser.assert.elements(LCHBuildPairExtensionPublicKeyField, 0);
		});
		
		it('hides LCHBuildPairExtensionSubmitButton', function() {
			browser.assert.elements(LCHBuildPairExtensionSubmitButton, 0);
		});
	
	});

});
