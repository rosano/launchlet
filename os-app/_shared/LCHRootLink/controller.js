exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHRootLink',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'main'));
		},
		OLSKRouteSignature: 'LCHRootLinkStubRoute',
		OLSKRouteLanguageCodes: ['en'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
