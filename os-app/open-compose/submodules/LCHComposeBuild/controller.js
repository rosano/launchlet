exports.OLSKControllerRoutes = function() {
	return [{
			OLSKRoutePath: '/stub/LCHComposeBuild',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteSignature: 'LCHComposeBuildStubRoute',
			OLSKRouteLanguages: ['en', 'fr', 'es'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
};
