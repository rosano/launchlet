exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/LCHLaunchxrCommand',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrCommandStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
