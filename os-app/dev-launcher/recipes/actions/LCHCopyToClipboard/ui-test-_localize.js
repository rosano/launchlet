import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};
	
describe(`LCHCopyToClipboardLocalize-${ languageCode }`, function () {
	
	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {
					return this.api.LCHCopyToClipboard('bravo');
				},
			}]),
			OLSKRoutingLanguage: languageCode,
		}));
	});

	before(function() {
		browser.assert.elements(LCHCopyToClipboardButton, 0);
	});

	before(function() {
		return browser.fill(LCHLauncherFilterInput, 'alfa');
	});

	before(function() {
		browser.click(LCHLauncherListItem);
	});

	it('localizes LCHCopyToClipboardButton', async function() {
		browser.assert.text(LCHCopyToClipboardButton, uLocalized('LCHCopyToClipboardButtonText'));
	});
	
});

});
