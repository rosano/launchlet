import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHComposeMaster_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});
	
		it('localizes LCHComposeMasterFilterField', function () {
			browser.assert.attribute(LCHComposeMasterFilterField, 'placeholder', uLocalized('LCHComposeMasterFilterFieldText'));
		});
	
		it('localizes LCHComposeMasterCreateButton', function () {
			browser.assert.attribute(LCHComposeMasterCreateButton, 'title', uLocalized('LCHComposeMasterCreateButtonText'));
		});

	});

});
