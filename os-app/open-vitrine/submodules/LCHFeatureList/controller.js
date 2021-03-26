exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHFeatureList',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteSignature: 'LCHFeatureListStubRoute',
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
