(function() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	if (process.env.NODE_ENV !== 'development') {
		return;
	}

	require('livereload').createServer({
		extraExts: [
			'md',
			'ejs',
		],
	}).watch(__dirname);
})();

exports.OLSKControllerRoutes = function() {
	return {
		LCHVitrineRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'ui-view'), {
					LCHVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked')(require('fs').readFileSync(require('path').join(__dirname, `body.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
						LCHVitrineTokenComposeURL: res.locals.OLSKCanonicalLocalizedFor('LCHComposeRoute'),
					}),
					OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
