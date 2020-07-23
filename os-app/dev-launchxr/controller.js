exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/launchxr',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
