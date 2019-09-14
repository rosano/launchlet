exports.OLSKControllerRoutes = function() {
	return {
		LCHLauncherRoute: {
			OLSKRoutePath: '/launcher',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'ui-view'), {
					LCHLauncherQuery: req.query,
				});
			},
			OLSKRouteLanguages: ['en'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		},
	};
};
