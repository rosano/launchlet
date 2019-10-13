import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionForm', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('focuses textarea', function() {
		browser.assert.hasFocus(LCHBuildPairExtensionPublicKeyField)
	});

	context('SubmitNotValid', function testSubmitNotValid () {

		it('alerts', function() {
			deepEqual(typeof browser.OLSKAlert(function () {
				browser.pressButton(LCHBuildPairExtensionSubmitButton)
			}), 'string');
		});

		it('sends no BuildPairExtensionDispatchPublicKeyUpdate', function() {
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdate', '0');
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText', 'undefined');
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

		it('sends BuildPairExtensionDispatchPublicKeyUpdate', function() {
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdate', '1');
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText', 'alfa');
		});

	});

	context('form submit', function() {

		before(function() {
			return browser.visit(kDefaultRoute.OLSKRoutePath);
		});

		before(function () {
			browser.fill(LCHBuildPairExtensionPublicKeyField, 'bravo')
			browser.fire(LCHBuildPairExtensionPublicKeyField, 'submit')
		});

		it('sends BuildPairExtensionDispatchPublicKeyUpdate', function() {
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdate', '1');
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText', 'bravo');
		});

	});

	context('PreloadPublicKey', function testPreloadPublicKey () {

		before(function() {
			return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				BuildPairExtensionPublicKey: 'alfa',
			}));
		});

		it('hides LCHBuildPairExtensionPublicKeyField', function() {
			browser.assert.elements(LCHBuildPairExtensionPublicKeyField, 0);
		});

		it('hides LCHBuildPairExtensionSubmitButton', function() {
			browser.assert.elements(LCHBuildPairExtensionSubmitButton, 0);
		});

	});

});
