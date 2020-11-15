exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHComposeInput',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHComposeInputStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
