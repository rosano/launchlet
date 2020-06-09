const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHComposePair_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});
	
		it('localizes LCHComposePairKeyField', function () {
			browser.assert.attribute(LCHComposePairKeyField, 'placeholder', uLocalized('LCHComposePairKeyFieldText'));
		});

		it('localizes LCHComposePairSubmitButton', function () {
			browser.assert.text(LCHComposePairSubmitButton, uLocalized('LCHComposePairSubmitButtonText'));
		});

		context('LCHComposePairClearIsVisible', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					LCHComposePairClearIsVisible: true,
				});
			});

			it('localizes LCHComposePairClearButton', function() {
				browser.assert.text(LCHComposePairClearButton, uLocalized('LCHComposePairClearButtonText'));
			});
		
		});
	
	});

});
