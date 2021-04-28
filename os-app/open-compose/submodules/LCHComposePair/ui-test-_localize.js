const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('LCHComposePair_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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
					OLSKRoutingLanguage,
					LCHComposePairClearIsVisible: true,
				});
			});

			it('localizes LCHComposePairClearButton', function() {
				browser.assert.text(LCHComposePairClearButton, uLocalized('LCHComposePairClearButtonText'));
			});
		
		});
	
	});

});
