exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHLaunchxrPrompt',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrPromptStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
