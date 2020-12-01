const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};
	
describe(`LCHSearch_Localize-${ OLSKRoutingLanguage }`, function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
			LCHOptionMode: 'LCHModePipe',
		});
	});

	context('LCHSearchWith', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Wikipedia');
		});

		it('localizes LCHLauncherPipeItemTitle', function() {
			browser.assert.text(`${ LCHLauncherActionPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, uLocalized('LCHStandardRecipeNames').LCHSearchFor);
		});
	
	});

	context('LCHSearchWith', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, '.');
		});

		before(function () {
			browser.fill(LCHLauncherPromptDotModeInput, 'alfa');

			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');

			return browser.OLSKFireKeyboardEvent(browser.window, 'LCHSearchWith');
		});

		it('localizes LCHLauncherPipeItemTitle', function() {
			browser.assert.text(`${ LCHLauncherActionPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, uLocalized('LCHStandardRecipeNames').LCHSearchWith);
		});
	
	});
	
});

});
