import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uFormatted = OLSKTestingStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHRootLink_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});

	it('localizes title', function () {
		browser.assert.attribute(LCHRootLink, 'title', uFormatted(uLocalized('LCHSharedColonSeparatedFormat'), uLocalized('LCHRootLinkLogoLabel'), uLocalized('LCHRootLinkText')))
	});

	it('localizes href', function () {
		browser.assert.attribute(LCHRootLink, 'href', OLSKTestingCanonicalFor('/', {
			OLSKRoutingLanguage: languageCode,
		}));
	});

});

});
