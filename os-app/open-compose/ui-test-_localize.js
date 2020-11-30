const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHCompose_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('LCHComposeTitle'));
		});

		it('localizes LCHComposeToolsPairButton', function() {
			browser.assert.text(LCHComposeToolsPairButton, uLocalized('LCHComposeToolsPairButtonText'));
		});

		context('select', function () {

			before(function () {
				return browser.pressButton('.LCHComposeMasterCreateButton');
			});			

			it('localizes LCHComposeLauncherItemClone', function () {
				return browser.assert.OLSKLauncherItemText('LCHComposeLauncherItemClone', uLocalized('LCHComposeLauncherItemCloneText'));
			});

		});	

		context('LCHComposePairDispatchSubmit', function () {

			before(function () {
				return browser.pressButton('.LCHComposeToolsPairButton');
			});

			it('localizes LCHComposePublicKeyNotValidAlert', function () {
				browser.assert.OLSKAlertText(function () {
					return browser.pressButton('.LCHComposePairSubmitButton');
				}, uLocalized('LCHComposePublicKeyNotValidAlertText'));
			});

			it('localizes LCHComposeToolsPairStatusWaiting', function () {
				browser.assert.text(LCHComposeToolsPairStatusWaiting, uLocalized('LCHComposeToolsPairStatusWaitingText'));
			});
		
		});

		context('TestLCHComposePairDidFail', function () {
			
			before(function () {
				browser.evaluate(`window.postMessage({
					LBXResponseHash: 'alfa',
				}, window.location.href)`);
			});
			
			it('localizes LCHComposeToolsPairStatusFailed', function() {
				browser.assert.text(LCHComposeToolsPairStatusFailed, uLocalized('LCHComposeToolsPairStatusFailedText'));
			});
		
		});

	});

});
