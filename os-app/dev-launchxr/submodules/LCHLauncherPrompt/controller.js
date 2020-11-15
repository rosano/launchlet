exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHLauncherPrompt',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherPromptStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
