exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/launchxr',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};

exports.OLSKControllerStaticAssetFiles = function () {
	return [
		'stub-behaviour.js',
	];
};
