exports.OLSKControllerUseLivereload = function() {
	return true;
};

exports.OLSKControllerRoutes = function() {
	return {
		LCHVitrineRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'ui-view'), {
					LCHVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked')(require('fs').readFileSync(require('path').join(__dirname, `body.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
						LCHVitrineTokenComposeURL: res.locals.OLSKCanonicalLocalizedFor('LCHComposeRoute'),
						LCHVitrineTokenRandomizePageColoursName: res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize,
						LCHVitrineTokenCopyPageInfoName: res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames').LCHVitrineCopyPageInfo,
						LCHVitrineTokenSendEmailName: res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail,
						LCHVitrineTokenPageLinksHighlightAddName: res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightAdd,
						LCHVitrineTokenMinimalistDateStringName: res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames').LCHVitrineMinimalistDateString,
					}),
					OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
