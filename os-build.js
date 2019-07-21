//# OLSKBuildExternalAssets

(function OLSKBuildExternalAssets() {
	const OLSKAssets = require('./node_modules/OLSKApp/modules/OLSKAssets/main.js');
	const pathPackage = require('path');

	OLSKAssets.OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'codemirror',
		'OLSKRouting',
		'OLSKLayout',
		'OLSKServiceWorker',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'os-app/_shared/_external'));
})();
