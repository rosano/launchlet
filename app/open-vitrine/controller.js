exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerSharedMiddlewares = function() {
	return {
		LCHVitrineRouteGuardMiddleware (req, res, next) {
			return next(require('./logic.js').LCHVitrineRouteGuard(process.env))
		},
	};
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHVitrineRoute',
		OLSKRouteFunction: function (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'), {
				LCHVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked').setOptions({
					gfm: true,
					headerIds: false,
				})(require('fs').readFileSync(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), Object.assign({
					LCHVitrineTokenComposeURL: res.locals.OLSKCanonicalLocalizedFor('LCHComposeRoute'),
					LCHVitrineTokenGuideURL: res.locals.OLSKCanonicalFor('LCHGuideRoute'),
					LCH_VITRINE_QUICKSILVER_URL: process.env.LCH_VITRINE_QUICKSILVER_URL,
					LCH_SHARED_EXTENSION_DOCS_URL: process.env.LCH_SHARED_EXTENSION_DOCS_URL,
					LCH_SHARED_PACKAGE_DOCS_URL: process.env.LCH_SHARED_PACKAGE_DOCS_URL,
					LCH_SHARED_GITHUB_URL: process.env.LCH_SHARED_GITHUB_URL,
					LCH_SHARED_DONATE_URL: process.env.LCH_SHARED_DONATE_URL,
				}, res.locals.OLSKLocalized('LCHVitrineDemoRecipeNames'), res.locals.OLSKLocalized('LCHStandardRecipeNames'))),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
		OLSKRouteMiddlewares: [
			'LCHVitrineRouteGuardMiddleware',
			'LCHSharedExtensionDocsLinkGuardMiddleware',
			'LCHSharedPackageDocsLinkGuardMiddleware',
			'LCHSharedGithubLinkGuardMiddleware',
			'LCHSharedDonateLinkGuardMiddleware',
		],
	}, {
		OLSKRoutePath: '/brueghel.jpg',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHBrueghelRedirect',
		OLSKRouteRedirect: process.env.LCH_SHARED_BRUEGHEL_URL,
	}];
};
