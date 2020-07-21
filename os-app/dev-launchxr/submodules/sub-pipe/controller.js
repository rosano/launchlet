exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/LCHLaunchxrPipe',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrPipeStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
