const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`LCHLauncherPipe_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				TestLauncherInput: uStubStringifyAll({
					LCHOptionMode: 'kLCHLauncherModePipe',
				}),
			});
		});

		it('localizes LCHLauncherPipeSubjectPromptFilterInputPlaceholderText', function () {
			browser.assert.attribute(`${ LCHLauncherPipeSubjectPrompt } .LCHLauncherFilterInput`, 'placeholder', uLocalized('LCHLauncherPipeSubjectPromptFilterInputPlaceholderText'));
		});

		it('localizes LCHLauncherPipeSubjectPromptPlaceholderText', function () {
			browser.assert.text(`${ LCHLauncherPipeSubjectPrompt } .LCHLauncherPromptPlaceholder`, uLocalized('LCHLauncherPipeSubjectPromptPlaceholderText'));
		});

		it('localizes LCHLauncherPipeActionPromptFilterInputPlaceholderText', function () {
			browser.assert.attribute(`${ LCHLauncherPipeActionPrompt } .LCHLauncherFilterInput`, 'placeholder', uLocalized('LCHLauncherPipeActionPromptFilterInputPlaceholderText'));
		});

	});

});
