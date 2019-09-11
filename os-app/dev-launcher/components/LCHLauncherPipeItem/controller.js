exports.OLSKControllerRoutes = function() {
	return {
		LCHLauncherPipeItemStubRoute: {
			OLSKRoutePath: '/stubs/LCHLauncherPipeItem',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'stub-view'));
			},
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		},
	};
};
