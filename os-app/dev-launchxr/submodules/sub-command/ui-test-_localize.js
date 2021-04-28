const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('LCHLauncherCommand_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes LCHLauncherFilterInput', function () {
			browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', uLocalized('LCHLauncherFilterInputText'));
		});

	});

});
