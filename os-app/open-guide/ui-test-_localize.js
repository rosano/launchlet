import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

['en'].forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHGuide_Localize-${ languageCode}`, function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('Startup', function testStartup() {

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('LCHGuideTitle'))
		});

		it('localizes description', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('LCHGuideDescription'))
		});
		
	});

});

})
