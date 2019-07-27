const pathPackage = require('path');

//_ OLSKControllerRoutes

exports.OLSKControllerRoutes = function() {
	return process.env.NODE_ENV === 'production' ? {} : {
		LCHPackageRoute: {
			OLSKRoutePath: '/package',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				require('../../node_modules/OLSKApp/modules/OLSKAssets/main.js').OLSKAssetsCopyAssetsFromTo([
					'dist',
				], pathPackage.join(__dirname, '../../'), pathPackage.join(__dirname, '_compiled'));
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'view'), {});
			},
			OLSKRouteLanguages: ['en'],
		},
	};
};

//_ OLSKControllerSharedStaticAssetFolders

exports.OLSKControllerSharedStaticAssetFolders = function() {
	return [
		'_compiled/dist',
	];
};

