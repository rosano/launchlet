exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

function OLSKRouteFunction (req, res, next) {
	const { LCHGuideExampleFormatted, LCHGuideExampleQuoted, LCHGuideExampleTemplate } = require('./ui-logic.js');
	function _LCHGuideExampleTemplate(inputData) {
		return LCHGuideExampleTemplate(LCHGuideExampleQuoted(LCHGuideExampleFormatted(inputData), function (inputData) {
			return res.locals.OLSKLocalized('LCHGuideDocumentFields')[inputData];
		}))
	};

	return res.render(require('path').join(__dirname, 'ui-view'), {
		LCHGuideContent: require('marked').setOptions({
			gfm: true,
		})(require('OLSKString').OLSKStringReplaceTokens(
			require('fs').readFileSync(require('path').join(__dirname, `body.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8'),
			Object.assign({
				LCHGuideTokenExampleCommandV1: _LCHGuideExampleTemplate({
					LCHDocumentName: 'Say Hello',
					LCHDocumentBody: `alert('Hello')`,
				}),
				LCHGuideTokenExampleProcedure: _LCHGuideExampleTemplate({
					LCHDocumentSignature: 'Greet',
					LCHDocumentArgs: 'message',
					LCHDocumentBody: `alert(message)`,
				}),
				LCHGuideTokenExampleCommandV2: _LCHGuideExampleTemplate({
					LCHDocumentName: 'Say Hello',
					LCHDocumentBody: `this.api.Greet('Hello')`,
				}),
				LCHGuideTokenExampleSubject: _LCHGuideExampleTemplate({
					LCHDocumentName: 'Salutation',
					LCHDocumentOutputType: 'String',
					LCHDocumentBody: `return 'Yo'`,
				}),
				LCHGuideTokenExampleAction: _LCHGuideExampleTemplate({
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
