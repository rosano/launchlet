exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHLauncherPipePrompt',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherPipePromptStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
