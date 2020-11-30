const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHLauncherCommand_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes LCHLauncherFilterInput', function () {
			browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', uLocalized('LCHLauncherFilterInputText'));
		});

	});

});
