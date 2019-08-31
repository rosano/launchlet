import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute.OLSKRoutePath;

describe('LCHVitrineUILocalize', function () {

['en'].forEach(function (languageCode) {

describe(languageCode, function () {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoutePath }`);
	});

	context('Startup', function testStartup() {

		it('localizes body', async function() {
			browser.assert.text('#launchlet', 'Launchlet')
		});

		it('localizes LCHVitrineDemoButtonCommit', async function() {
			browser.assert.text(LCHVitrineDemoButtonCommit, uLocalized('LCHVitrineDemoButtonText'))
		});
		
	});

});

});

});
