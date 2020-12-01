const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};
	
describe(`LCHCopyToClipboard_Localize-${ OLSKRoutingLanguage }`, function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
			LCHOptionMode: 'LCHModePipe',
		});
	});

	before(function() {
		return browser.OLSKFireKeyboardEvent(browser.window, '.');
	});

	before(function() {
		return browser.fill('.LCHLauncherPromptDotModeInput', 'alfa');
	});

	it('localizes LCHLauncherPipeItemTitle', function() {
		browser.assert.text('.LCHLauncherPipeItemTitle', uLocalized('LCHStandardRecipeNames').LCHCopyToClipboard);
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
