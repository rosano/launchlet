import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHComposeFooter_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
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
