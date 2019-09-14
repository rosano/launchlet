import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHVitrineUILocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }`);
	});

	context('Startup', function testStartup() {

		it('localizes body', function() {
			browser.assert.text('#launchlet', 'Launchlet')
		});

		it('localizes LCHVitrineDemoButtonCommit', function() {
			browser.assert.text(LCHVitrineDemoButtonCommit, uLocalized('LCHVitrineDemoButtonText'))
		});
		
	});

});

});
