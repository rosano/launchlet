exports.OLSKControllerRoutes = function() {
	return {
		LCHLauncherPromptStubRoute: {
			OLSKRoutePath: '/stubs/LCHLauncherPrompt',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		},
	};
};
