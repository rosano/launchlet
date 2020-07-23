const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`LCHLauncherPipe_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
				TestLauncherInput: uStubStringifyAll({
					LCHOptionMode: 'kLCHLauncherModePipe',
				}),
			});
		});

		it('localizes LCHLauncherPipeSubjectPromptFilterInputPlaceholderText', function () {
			browser.assert.attribute(`${ LCHLauncherPipeSubjectPrompt } .LCHLauncherFilterInput`, 'placeholder', uLocalized('LCHLauncherPipeSubjectPromptFilterInputPlaceholderText'));
		});

		it('localizes LCHLauncherPipeSubjectPromptPlaceholderText', function () {
			browser.assert.text(`${ LCHLauncherPipeSubjectPrompt } .LCHLauncherPipePromptPlaceholder`, uLocalized('LCHLauncherPipeSubjectPromptPlaceholderText'));
		});

	});

});
