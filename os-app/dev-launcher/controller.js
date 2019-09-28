exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/launcher',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherRoute',
		OLSKRouteFunction: function(req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'), {});
		},
		OLSKRouteLanguages: ['en', 'fr'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
