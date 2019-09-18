import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().LCHComposeRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHComposeFooterLocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }`);
	});
	
	it('localizes LCHComposeFooterStorageButton', function() {
		browser.assert.attribute(LCHComposeFooterStorageButton, 'title', uLocalized('LCHComposeFooterStorageButtonText'));
	});

});

});
