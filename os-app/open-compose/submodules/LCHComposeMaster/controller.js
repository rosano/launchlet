exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHComposeMaster',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHComposeMasterStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
	}];
};
