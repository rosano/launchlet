exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/guide',
		OLKSRouteSignature: 'LCHGuideRoute',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction: function (req, res, next) {
			const { LCHGuideExampleFormatted, LCHGuideExampleQuotes } = require('./ui-logic.js');

			function LCHGuideExampleTemplate(inputData) {
				return `<div class="LCHGuideExample">

${ LCHGuideExampleQuotes((function (inputData) {
	let outputData = {};

	for (key in inputData) {
		outputData[res.locals.OLSKLocalized('LCHGuideDocumentFields')[key]] = inputData[key];
	}

	return outputData
})(LCHGuideExampleFormatted(inputData))).join('\n\n') }

</div>`;
			};

			return res.render(require('path').join(__dirname, 'ui-view'), {
				LCHGuideContent: require('marked').setOptions({
					gfm: true,
				})(require('OLSKString').OLSKStringReplaceTokens(
					require('fs').readFileSync(require('path').join(__dirname, `body.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8'),
					{
						LCHGuideTokenExampleCommand: LCHGuideExampleTemplate({
							LCHDocumentName: 'Say Hello',
							LCHDocumentBody: `alert('Hello')`,
						}),
					},
					)),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
	}];
};
