const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`LCHComposeBuild_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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
