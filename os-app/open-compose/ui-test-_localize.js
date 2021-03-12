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

		it('localizes LCHComposeMasterCreateButton', function () {
			browser.assert.attribute(LCHComposeMasterCreateButton, 'title', uLocalized('LCHComposeMasterCreateButtonText'));
		});

		it('localizes LCHComposeToolsPairButton', function() {
			browser.assert.text(LCHComposeToolsPairButton, uLocalized('LCHComposeToolsPairButtonText'));
		});

		it('localizes LCHComposeLauncherItemImportJSON', function () {
			return browser.assert.OLSKLauncherItemText('LCHComposeLauncherItemImportJSON', uLocalized('LCHComposeLauncherItemImportJSONText'));
		});

		it('localizes LCHComposeLauncherItemExportJSON', function () {
			return browser.assert.OLSKLauncherItemText('LCHComposeLauncherItemExportJSON', uLocalized('LCHComposeLauncherItemExportJSONText'));
		});

		describe('LCHComposeLauncherItemImportJSON', function test_LCHComposeLauncherItemImportJSON() {

			context('not filled', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'LCHComposeLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not filled', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = ' ';

							return dialog;
						});
					}, uLocalized('LCHComposeLauncherItemImportJSONErrorNotFilledAlertText'));
				});
			
			});

			context('not json', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'LCHComposeLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not json', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = 'alfa';

							return dialog;
						});
					}, uLocalized('LCHComposeLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});

			context('not valid', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'LCHComposeLauncherItemDebug_PromptFakeImportSerialized');
				});

				it('alerts if not valid', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							dialog.response = JSON.stringify({
								[Math.random().toString()]: Math.random().toString(),
							});

							return dialog;
						});
					}, uLocalized('LCHComposeLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});
			
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
