import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = function (inputData) {
	browser.fill(LCHLauncherFilterInput, inputData)
	return browser.wait({ elemen: '.LCHLauncherResultListItem' })
};

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHVitrineLocalize-${ languageCode }`, function () {

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

	context('DemoCommit', function testDemoCommit() {

		before(function () {
			browser.click(LCHVitrineDemoButtonCommit);
			return browser.wait({element: LCHLauncherFilterInput});
		});

		it('localizes LCHVitrineSendEmail', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);
		});
		
	});

});

});
