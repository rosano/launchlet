exports.OLSKControllerRoutes = function() {
	return {
		LCHLauncherPipeItemRoute: {
			OLSKRoutePath: '/components/LCHLauncherPipeItem',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'stub-view'));
			},
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		},
	};
};
