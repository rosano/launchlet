exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

function OLSKRouteFunction (req, res, next) {
	const { LCHGuideExampleFormatted, LCHGuideExampleQuoted } = require('./ui-logic.js');
	function LCHGuideExampleTemplate(inputData) {
		return `<div class="LCHGuideExample">\n\n${ LCHGuideExampleQuoted((function (inputData) {
			let outputData = {};

			for (key in inputData) {
				outputData[res.locals.OLSKLocalized('LCHGuideDocumentFields')[key]] = inputData[key];
			}

			return outputData;
		})(LCHGuideExampleFormatted(inputData))).join('\n\n') }\n\n</div>`;
	};

	return res.render(require('path').join(__dirname, 'ui-view'), {
		LCHGuideContent: require('marked').setOptions({
			gfm: true,
		})(require('OLSKString').OLSKStringReplaceTokens(
			require('fs').readFileSync(require('path').join(__dirname, `body.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8'),
			Object.assign({
				LCHGuideTokenExampleCommandV1: LCHGuideExampleTemplate({
					LCHDocumentName: 'Say Hello',
					LCHDocumentBody: `alert('Hello')`,
				}),
				LCHGuideTokenExampleProcedure: LCHGuideExampleTemplate({
					LCHDocumentSignature: 'Greet',
					LCHDocumentArgs: 'message',
					LCHDocumentBody: `alert(message)`,
				}),
				LCHGuideTokenExampleCommandV2: LCHGuideExampleTemplate({
					LCHDocumentName: 'Say Hello',
					LCHDocumentBody: `this.api.Greet('Hello')`,
				}),
				LCHGuideTokenExampleSubject: LCHGuideExampleTemplate({
					LCHDocumentName: 'Salutation',
					LCHDocumentOutputType: 'String',
					LCHDocumentBody: `return 'Yo'`,
				}),
				LCHGuideTokenExampleAction: LCHGuideExampleTemplate({
					LCHDocumentName: 'Shout',
					LCHDocumentInputTypes: 'String',
					LCHDocumentArgs: 'message',
					LCHDocumentBody: 'alert(message.toUppercase())',
				}),
			}, res.locals.OLSKLocalized('LCHGuideDocumentFields'))
			)),
		OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
	});
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteSignature: 'LCHGuideRoute',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction,
	}];
};
