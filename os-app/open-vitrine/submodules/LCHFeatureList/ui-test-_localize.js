const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('LCHFeatureList_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		uLocalized('LCHFeatureListArray').forEach(function ([name, blurb], i) {

			it('localizes LCHVitrineStandardFeaturesItem', function () {
				browser.assert.text(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemName`, name);
			});

			it('localizes LCHVitrineStandardFeaturesBlurb', function () {
				browser.assert.text(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemBlurb`, blurb);
			});
			
		});

	});

});
