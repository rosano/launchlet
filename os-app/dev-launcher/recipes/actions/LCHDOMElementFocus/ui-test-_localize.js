const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};
	
describe(`LCHDOMElementFocus_Localize-${ languageCode }`, function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
			LCHOptionMode: 'LCHModePipe',
		});
	});

	before(function() {
		browser.OLSKFireKeyboardEvent(browser.window, 'LCHActiveDocumentFocusElements');
		return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
	});

	it('localizes LCHLauncherPipeItemTitle', function() {
		browser.assert.text(`${ LCHLauncherActionPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, uLocalized('LCHStandardRecipeNames').LCHDOMElementFocus);
	});

});

});
