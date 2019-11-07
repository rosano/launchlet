exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stubs/LCHLauncherResultList',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherResultListStubRoute',
		OLSKRouteFunction: function(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
