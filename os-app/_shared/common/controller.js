const pathPackage = require('path');

exports.OLSKControllerRoutes = function() {
	return {
		LCHCommonLogoRedirect: {
			OLSKRoutePath: '/logo.svg',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: '/_shared/LCHRootLink/ui-assets/logo.svg',
		},
	};
};
exports.OLSKControllerSharedMiddlewares = function() {
	return {
		LCHSharedPackageDocsLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').LCHSharedPackageDocsLinkGuard(process.env))
		},
		LCHSharedExtensionDocsLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').LCHSharedExtensionDocsLinkGuard(process.env))
		},
		LCHSharedGitHubLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').LCHSharedGitHubLinkGuard(process.env))
		},
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
