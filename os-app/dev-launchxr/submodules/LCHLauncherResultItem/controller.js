exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHLaunchxrResultItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrResultItemStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
