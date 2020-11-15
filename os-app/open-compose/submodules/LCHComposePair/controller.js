exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHComposePair',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHComposePairStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
	}];
};
