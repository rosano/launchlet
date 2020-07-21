exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/launchxr',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
