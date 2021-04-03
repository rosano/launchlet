const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`LCHCompose_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('LCHComposeTitle'));
		});

		it('localizes LCHComposeCreateButton', function () {
			browser.assert.attribute(LCHComposeCreateButton, 'title', uLocalized('LCHComposeCreateButtonText'));
		});

		it('localizes LCHComposeToolsPairButton', function() {
			browser.assert.text(LCHComposeToolsPairButton, uLocalized('LCHComposeToolsPairButtonText'));
		});

		describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			it('localizes LCHLauncherFilterInput', function () {
				browser.assert.attribute('.LCHLauncherFilterInput', 'placeholder', uLocalized('OLSKWordingTypeToSearch'));
			});

			after(function () {
				return browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		describe('OLSKAppToolbarLanguageButton', function test_OLSKAppToolbarLanguageButton () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			it('localizes LCHLauncherFilterInput', function () {
				browser.assert.attribute('.LCHLauncherFilterInput', 'placeholder', uLocalized('OLSKWordingTypeToFilter'));
			});

			after(function () {
				return browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		context('select', function () {

			before(function () {
				return browser.pressButton('.LCHComposeCreateButton');
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

		describe('OLSKApropos', function test_OLSKApropos() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarAproposButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('OLSKAproposHeadingText'));
			});

			after(function () {
				browser.pressButton('.OLSKModalViewCloseButton');
			});

		});

		describe('tongue', function test_tongue() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			kDefaultRoute.OLSKRouteLanguageCodes.filter(function (e) {
				return e !== OLSKRoutingLanguage;
			}).forEach(function (e) {

				const signature = 'OLSKLanguageSwitcherLauncherItemSwitch-' + e;

				before(function () {
					return browser.fill('.LCHLauncherFilterInput', signature);
				});

				it(`shows ${ signature }`, function () {
					browser.assert.elements('.LCHLauncherPipeItem', 1);
				});

			});

			after(function () {
				browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

	});

});
