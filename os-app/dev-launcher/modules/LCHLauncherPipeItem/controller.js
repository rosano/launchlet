//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return process.env.NODE_ENV === 'production' ? {} : {
		LCHLauncherPipeItemRoute: {
			OLSKRoutePath: '/modules/LCHLauncherPipeItem',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'stub-view'));
			},
		},
	};
};
