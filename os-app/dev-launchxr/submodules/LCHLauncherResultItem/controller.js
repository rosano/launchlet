exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHLauncherResultItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherResultItemStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
