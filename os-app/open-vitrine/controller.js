exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHVitrineRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
				LCHVitrineContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), Object.assign({
					LCH_SHARED_EXTENSION_DOCS_URL: process.env.LCH_SHARED_EXTENSION_DOCS_URL,
					LCH_SHARED_PACKAGE_DOCS_URL: process.env.LCH_SHARED_PACKAGE_DOCS_URL,
				}, res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames'), res.locals.OLSKLocalized('LCHStandardRecipeNames'))),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}, {
		OLSKRoutePath: '/brueghel.jpg',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHBrueghelRedirect',
		OLSKRouteRedirect: process.env.LCH_SHARED_BRUEGHEL_URL,
	}];
};
