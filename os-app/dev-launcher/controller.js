//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return process.env.NODE_ENV === 'production' ? {} : {
		LCHLauncherRoute: {
			OLSKRoutePath: '/launcher',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view'), {
					LCHLauncherQuery: req.query,
				});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};
