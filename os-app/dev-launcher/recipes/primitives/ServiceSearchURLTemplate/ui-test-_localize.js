import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};
	
describe(`ServiceSearchURLTemplate_Localize-${ languageCode }`, function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
			LCHOptionMode: 'LCHModePipe',
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {},
				LCHRecipeOutputType: 'ServiceSearchURLTemplate',
			}]),
		});
	});

	before(function() {
		browser.OLSKFireKeyboardEvent(browser.window, 'alfa');
	});

	it('localizes LCHLauncherPipeItemTitle', function() {
		browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemSubtitle }`, uLocalized('LCHStandardRecipeNames').ServiceSearchURLTemplate);
	});
	
});

});
