(function() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	require('livereload').createServer({
		extraExts: [
			'md',
			'ejs',
		],
	}).watch(__dirname);
})();

//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHVitrineRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'view'), {
					LCHVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked')(require('fs').readFileSync(require('path').join(__dirname, `body.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
						LCHVitrineTokenComposeURL: res.locals.OLSKCanonicalLocalizedFor('LCHComposeRoute')
					}),
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
