exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/LCHLauncherPipe',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherPipeStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
