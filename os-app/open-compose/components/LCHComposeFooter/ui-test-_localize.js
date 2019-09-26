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
	
	it('localizes LCHComposeFooterGuideLink', function() {
		browser.assert.text(LCHComposeFooterGuideLink, uLocalized('LCHComposeFooterGuideLinkText'));
	});
	
	it('localizes LCHComposeFooterDonateLink', function() {
		browser.assert.text(LCHComposeFooterDonateLink, uLocalized('LCHComposeFooterDonateLinkText'));
	});

});

});
