exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHVitrineRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'), {
				LCHVitrineContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), Object.assign({
					LCHVitrineTokenComposeURL: res.locals.OLSKCanonicalLocalizedFor('LCHComposeRoute'),
					LCHVitrineTokenGuideURL: res.locals.OLSKCanonicalFor('LCHGuideRoute'),
					LCHVitrineContentAppButtonText: res.locals.OLSKLocalized('LCHVitrineContentAppButtonText'),
					LCH_VITRINE_QUICKSILVER_URL: process.env.LCH_VITRINE_QUICKSILVER_URL,
					LCH_SHARED_EXTENSION_DOCS_URL: process.env.LCH_SHARED_EXTENSION_DOCS_URL,
					LCH_SHARED_PACKAGE_DOCS_URL: process.env.LCH_SHARED_PACKAGE_DOCS_URL,
					LCH_SHARED_GITHUB_URL: process.env.LCH_SHARED_GITHUB_URL,
				}, res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames'), res.locals.OLSKLocalized('LCHStandardRecipeNames'))),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}, {
		OLSKRoutePath: '/brueghel.jpg',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHBrueghelRedirect',
		OLSKRouteRedirect: process.env.LCH_SHARED_BRUEGHEL_URL,
	}];
};
