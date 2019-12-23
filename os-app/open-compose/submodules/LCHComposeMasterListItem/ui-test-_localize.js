const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHComposeMasterListItem_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				LCHComposeMasterListItemAccessibilitySummary: 'alfa',
				LCHComposeMasterListItemTitle: 'bravo',
				LCHComposeMasterListItemFlagged: true,
			});
		});

		it('localizes LCHComposeMasterListItemFlaggedAlert', function() {
			browser.assert.text(LCHComposeMasterListItemFlaggedAlert, '⚠️');
		});

	});

});
