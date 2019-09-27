import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};
	
describe.only(`SubjectContainer_Localize-${ languageCode }`, function () {
	
	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
			runMode: 'kRunModePipe',
		}));
	});

	before(function() {
		browser.OLSKFireKeyboardEvent(browser.window, 'LCHActiveDocumentFocusElements');
	});

	it('localizes LCHLauncherPipeItemSubtitle', function() {
		browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemSubtitle }`, uLocalized('LCHStandardRecipeNames').SubjectContainer);
	});

});

});
