import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uFormatted = OLSKTestingStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHLauncherLocalizeCommit-${ languageCode }`, function testLCHLauncherLocalizeCommit () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
			runMode: 'kRunModeCommit',
		}));
	});

	it('localizes LCHLauncherFilterInput', function() {
		browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', uLocalized('LCHLauncherInputPlaceholderDefault'));
	});

});

describe(`LCHLauncherLocalizePreview-${ languageCode }`, function testLCHLauncherLocalizePreview () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
			runMode: 'kRunModePreview',
		}));
	});

	it('localizes LCHLauncherFilterInput', function() {
		browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', uLocalized('LCHLauncherInputPlaceholderPreview'));
	});

});

describe(`LCHLauncherLocalizePipe-${ languageCode }`, function testLCHLauncherLocalizePipe () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
			runMode: 'kRunModePipe',
		}));
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

	it('localizes LCHLauncherObjectPromptHeading');

});

});
