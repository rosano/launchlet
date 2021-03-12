const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`LCHComposeListItem_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				LCHComposeListItemTitle: 'bravo',
				LCHComposeListItemFlagged: true,
			});
		});

		it('localizes LCHComposeListItemFlaggedAlert', function() {
			browser.assert.text(LCHComposeListItemFlaggedAlert, '⚠️');
		});

	});

});
