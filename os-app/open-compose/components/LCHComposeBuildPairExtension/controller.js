exports.OLSKControllerRoutes = function() {
	return [{
			OLSKRoutePath: '/stubs/LCHComposeBuildPairExtension',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteSignature: 'LCHComposeBuildPairExtensionStubRoute',
			OLSKRouteLanguages: ['en', 'fr', 'es'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
};
