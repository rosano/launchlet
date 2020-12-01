const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};

describe(`LCHLauncherLocalizeCommit-${ OLSKRoutingLanguage }`, function test_LCHLauncherLocalizeCommit () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
			LCHOptionMode: 'LCHModeCommit',
		});
	});

	it('localizes LCHLauncherFilterInput', function() {
		browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', uLocalized('LCHLauncherInputPlaceholderDefault'));
	});

});

describe(`LCHLauncherLocalizePreview-${ OLSKRoutingLanguage }`, function test_LCHLauncherLocalizePreview () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
			LCHOptionMode: 'LCHModePreview',
		});
	});

	it('localizes LCHLauncherFilterInput', function() {
		browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', uLocalized('LCHLauncherInputPlaceholderPreview'));
	});

});

describe(`LCHLauncherLocalizePipe-${ OLSKRoutingLanguage }`, function test_LCHLauncherLocalizePipe () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
			LCHOptionMode: 'LCHModePipe',
		});
	});

	it('localizes LCHLauncherSubjectPromptHeading', function() {
		browser.assert.text(LCHLauncherSubjectPromptHeading, uLocalized('LCHLauncherSubjectPromptHeadingText'));
	});

	it('localizes LCHLauncherSubjectPromptPlaceholder', function() {
		browser.assert.text(LCHLauncherSubjectPromptPlaceholder, uLocalized('LCHLauncherSubjectPromptPlaceholderText'));
	});

	it('localizes LCHLauncherActionPromptHeading', function() {
		browser.assert.text(LCHLauncherActionPromptHeading, uLocalized('LCHLauncherActionPromptHeadingText'));
	});

	context('ObjectPrompt', function () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'w');
		});

		before(function () {
			browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } .LCHLauncherPipeItemTitle`, 'Wikipedia'); // #localize
		});

		it('localizes LCHLauncherObjectPromptHeading', function() {
			browser.assert.text(LCHLauncherObjectPromptHeading, uLocalized('LCHLauncherObjectPromptHeadingText'));
		});
	
	});

});

});
