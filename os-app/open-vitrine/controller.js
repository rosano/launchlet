exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function() {
	return {
		LCHVitrineRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'ui-view'), {
					LCHVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked')(require('fs').readFileSync(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), Object.assign({
						LCHVitrineTokenComposeURL: res.locals.OLSKCanonicalLocalizedFor('LCHComposeRoute'),
						LCHVitrineTokenGuideURL: res.locals.OLSKCanonicalFor('LCHGuideRoute'),
					}, res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames'), res.locals.OLSKLocalized('LCHStandardRecipeNames'))),
					OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
				});
			},
			OLSKRouteLanguages: ['en', 'fr'],
		},
	};
};
