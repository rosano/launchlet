exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHComposeBuild',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHComposeBuildStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
	}];
};
