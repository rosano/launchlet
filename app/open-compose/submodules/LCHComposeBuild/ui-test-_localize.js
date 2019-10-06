import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHCompose_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
		}));
	});

	it('localizes LCHComposeBuildIncludePageRecipesFieldLabel', function() {
		browser.assert.text(LCHComposeBuildIncludePageRecipesFieldLabel, uLocalized('LCHComposeBuildIncludePageRecipesFieldLabelText'));
	});

	it('localizes LCHComposeBuildModePipeEnabledToggle', function() {
		browser.assert.text(`label[for=${ LCHComposeBuildModePipeEnabledToggle.replace('#', '') }]`, uLocalized('LCHComposeBuildModePipeEnabledToggleLabelText'));
	});

	it('localizes LCHComposeBuildPairButton', function() {
		browser.assert.text(LCHComposeBuildPairButton, uLocalized('LCHComposeBuildPairButtonText'));
	});

});

});
