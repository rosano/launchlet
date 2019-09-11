import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHComposeUILocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }`);
	});

	it('localizes LCHBuildPairExtensionPublicKeyField', function () {
		browser.assert.attribute(LCHBuildPairExtensionPublicKeyField, 'placeholder', uLocalized('LCHBuildPairExtensionPublicKeyFieldLabel'))
	});

	it('localizes LCHBuildPairExtensionSubmitButton', function () {
		browser.assert.text(LCHBuildPairExtensionSubmitButton, uLocalized('LCHBuildPairExtensionSubmitButtonLabel'))
	});

});

});
