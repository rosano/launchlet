import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};
	
describe(`LCHCopyToClipboard_Localize-${ languageCode }`, function () {
	
	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
			LRTOptionMode: 'LRTModePipe',
		}));
	});

	before(function() {
		return browser.OLSKFireKeyboardEvent(browser.window, '.');
	});

	before(function() {
		browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
	});

	it('localizes LCHLauncherPipeItemTitle', function() {
		browser.assert.text(`${ LCHLauncherActionPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, uLocalized('LCHStandardRecipeNames').LCHCopyToClipboard);
	});

	context('callback', function () {
		
		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
		});

		it('localizes LCHCopyToClipboardButton', function() {
			browser.assert.text(LCHCopyToClipboardButton, uLocalized('LCHCopyToClipboardButtonText'));
		});
	
	});
	
});

});
