const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHLaunchxrCommand_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes LCHLaunchxrFilterInput', function () {
			browser.assert.attribute(LCHLaunchxrFilterInput, 'placeholder', uLocalized('LCHLaunchxrFilterInputText'));
		});

	});

});
