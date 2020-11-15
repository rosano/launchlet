exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/launcher',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
