import { deepEqual } from 'assert';

const kDefaultRoute.OLSKControllerRoutes = require('../../controller.js').OLSKControllerRoutes().LCHComposeRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHComposeDetail_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKControllerRoutes }`);
	});

	it('localizes LCHComposeFormCanonicalExampleBodyField', async function() {
		await uCreateItem(browser);

		browser.fill(LCHComposeFormOutputTypeField, 'Bool');
		await browser.wait({ element: LCHComposeFormCanonicalExampleBodyField });
		
		browser.assert.text(`${ LCHComposeFormCanonicalExampleBodyField } .CodeMirror-placeholder`, uLocalized('LCHComposeFormCanonicalExampleBodyFieldPlaceholderText'));
	});

});
	
});
