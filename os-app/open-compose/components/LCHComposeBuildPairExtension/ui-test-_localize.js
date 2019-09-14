import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHComposeLocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }`);
	});

	it('localizes LCHBuildPairExtensionPublicKeyField', function () {
		browser.assert.attribute(LCHBuildPairExtensionPublicKeyField, 'placeholder', uLocalized('LCHBuildPairExtensionPublicKeyFieldLabel'))
	});

	it('localizes LCHBuildPairExtensionSubmitButton', function () {
		browser.assert.text(LCHBuildPairExtensionSubmitButton, uLocalized('LCHBuildPairExtensionSubmitButtonLabel'))
	});

	it('localizes LCHBuildPairExtensionAlert', function () {
		deepEqual(browser.OLSKAlert(function () {
			browser.pressButton(LCHBuildPairExtensionSubmitButton)
		}), uLocalized('LCHBuildPairExtensionAlertText'))
	});

	it('localizes LCHBuildPairExtensionStatusWaiting', function () {
		browser.assert.text(LCHBuildPairExtensionStatusWaiting, uLocalized('LCHBuildPairExtensionStatusWaitingText'))
	});

	context('SubmitValid', function testSubmitValid () {
		
		before(function () {
			browser.fill(LCHBuildPairExtensionPublicKeyField, 'alfa')
			browser.click(LCHBuildPairExtensionSubmitButton)
		});
		
		it('localizes LCHBuildPairExtensionDeleteKeyButton', function() {
			browser.assert.text(LCHBuildPairExtensionDeleteKeyButton, uLocalized('LCHBuildPairExtensionDeleteKeyButtonText'));
		});
	
	});

	context('Failed', function testFailed () {
		
		before(function () {
			browser.evaluate(`window.postMessage({
				LBXResponseHash: 'alfa',
			}, window.location.href)`)
		});
		
		it('localizes LCHBuildPairExtensionStatusFailed', function() {
			browser.assert.text(LCHBuildPairExtensionStatusFailed, uLocalized('LCHBuildPairExtensionStatusFailedText'))
		});
	
	});

});

});
