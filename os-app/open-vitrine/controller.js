var livereload = require('livereload');
var server = livereload.createServer({
	extraExts: [
		'md',
	],
});
server.watch(__dirname);

//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHVitrineRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'view'), {
					LCHVitrineContent: require('OLSKString').OLSKStringReplaceTokens(require('marked')(require('fs').readFileSync(require('path').join(__dirname, `content.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
						LCHVitrineTokenComposeURL: res.locals.OLSKCanonicalLocalizedFor('LCHComposeRoute')
					}),
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
