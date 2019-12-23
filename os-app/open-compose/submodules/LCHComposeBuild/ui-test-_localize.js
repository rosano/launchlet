const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHComposeBuild_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				LCHComposeBuildRunLink: 'alfa',
			});
		});
	
		it('localizes LCHComposeBuildRunLink', function() {
			browser.assert.text(LCHComposeBuildRunLink, uLocalized('LCHComposeBuildRunLinkText'));
		});

		it('localizes LCHComposeBuildPipeModeEnabledFieldLabel', function () {
			browser.assert.text(LCHComposeBuildPipeModeEnabledFieldLabel, uLocalized('LCHComposeBuildPipeModeEnabledFieldLabelText'));
		});

		it('localizes LCHComposeBuildPageRecipesEnabledFieldLabel', function () {
			browser.assert.text(LCHComposeBuildPageRecipesEnabledFieldLabel, uLocalized('LCHComposeBuildPageRecipesEnabledFieldLabelText'));
		});
	
	});

});
