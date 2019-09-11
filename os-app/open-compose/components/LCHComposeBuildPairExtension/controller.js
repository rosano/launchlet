exports.OLSKControllerRoutes = function() {
	return [{
			OLSKRoutePath: '/stubs/LCHComposeBuildPairExtension',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'stub-view'));
			},
			OLSKRouteSignature: 'LCHComposeBuildPairExtensionStubRoute',
			OLSKRouteLanguages: ['en'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
};
