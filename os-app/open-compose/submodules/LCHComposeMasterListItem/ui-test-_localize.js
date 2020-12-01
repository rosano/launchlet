const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`LCHComposeMasterListItem_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				LCHComposeMasterListItemTitle: 'bravo',
				LCHComposeMasterListItemFlagged: true,
			});
		});

		it('localizes LCHComposeMasterListItemFlaggedAlert', function() {
			browser.assert.text(LCHComposeMasterListItemFlaggedAlert, '⚠️');
		});

	});

});
