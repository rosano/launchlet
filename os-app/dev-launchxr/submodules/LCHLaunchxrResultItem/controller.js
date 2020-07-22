exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHLaunchxrResultItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrResultItemStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
