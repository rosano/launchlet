//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return {
		LCHVitrineRoute: {
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function (req, res, next) {
				return res.render(require('path').join(__dirname, 'view'), {
					LCHVitrineContent: require('marked')(require('fs').readFileSync(require('path').join(__dirname, `content.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')),
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
