import { deepEqual } from 'assert';

const kDefaultRoutePath = require('../../controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

['en'].forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHComposeDetailUILocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoutePath }`);
	});

	it('localizes LCHComposeFormCanonicalExampleBodyField', async function() {
		await uCreateItem(browser);

		browser.fill(LCHComposeFormOutputTypeField, 'Bool');
		await browser.wait({ element: LCHComposeFormCanonicalExampleBodyField });
		
		browser.assert.text(`${ LCHComposeFormCanonicalExampleBodyField } .CodeMirror-placeholder`, uLocalized('LCHComposeFormCanonicalExampleBodyFieldPlaceholderText'));
	});

});
	
});
