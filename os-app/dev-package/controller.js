const pathPackage = require('path');

exports.OLSKControllerRoutes = function() {
	return {
		LCHPackageRoute: {
			OLSKRoutePath: '/package',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(require('path').join(__dirname, 'ui-view'), {});
			},
			OLSKRouteLanguages: ['en'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		},
		LCHPackageCompiledScriptRedirect: {
			OLSKRoutePath: '/launchlet.js',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: require('path').join('/', require('path').basename(__dirname), '__compiled/launchlet.js'),
		},
		LCHPackageCompiledStyleRedirect: {
			OLSKRoutePath: '/launchlet.css',
			OLSKRouteMethod: 'get',
			OLSKRouteRedirect: require('path').join('/', require('path').basename(__dirname), '__compiled/launchlet.css'),
		},
	};
};

//_ OLSKControllerSharedStaticAssetFolders

exports.OLSKControllerSharedStaticAssetFolders = function() {
	return [
		'__compiled',
	];
};

