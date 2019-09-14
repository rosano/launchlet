import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = async function (inputData) {
	browser.fill(LCHLauncherFilterInput, inputData)
	await browser.wait({ element: '.LCHLauncherResultListItem' })
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

		beforeEach(async function () {
			await browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }`);
			
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: LCHLauncherFilterInput});
		});

		it('localizes LCHVitrineRandomizePageColours', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineRandomizePageColours);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineRandomizePageColours);
		});

		it('localizes LCHVitrineRestorePageColours', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineRandomizePageColours);
			
			browser.click('.LCHLauncherResultListItem');
			await browser.wait({element: 'style.LCHVitrineRandomizePageColours'});

			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: LCHLauncherFilterInput});
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineRestorePageColours);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineRestorePageColours);
		});

		it('localizes LCHVitrineSendEmail', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);
		});
		
	});

});

});
