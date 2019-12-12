exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/LCHLauncherPrompt',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherPromptStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
