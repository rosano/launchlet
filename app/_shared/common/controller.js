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
		LCHSharedGithubLinkGuardMiddleware (req, res, next) {
			return next(require('./logic.js').LCHSharedGithubLinkGuard(process.env))
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
