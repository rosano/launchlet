const pathPackage = require('path');

exports.OLSKControllerRoutes = function() {
	return {
		LCHCommonLogoRedirect: {
			OLSKRoutePath: '/logo.svg',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: '/_shared/LCHRootLink/ui-assets/logo.svg',
		},
		LCHBrueghelRedirect: {
			OLSKRoutePath: '/brueghel.jpg',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: process.env.LCH_SHARED_BRUEGHEL_URL,
		},
	};
};
exports.OLSKControllerSharedMiddlewares = function() {
	return {
		LCHSharedDonateLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').LCHSharedDonateLinkGuard(process.env))
		},
	};
};

//_ OLSKControllerSharedStaticAssetFolders

exports.OLSKControllerSharedStaticAssetFolders = function() {
	return [
		'_shared/__external',
	];
};
