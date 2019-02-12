//# OLSKStartExternalAssets

(function OLSKStartExternalAssets() {
	const OLSKExternalAssets = require('./node_modules/OldSkool/modules/OLSKExternalAssets/main.js');
	const pathPackage = require('path');

	OLSKExternalAssets.OLSKExternalAssetsCopyAssetsFromTo([
		'normalize.css',
		'd3',
		'OLSKInternational',
		'OLSKString',
		'codemirror',
		'dragula',
		'd3-selection',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'os-app/_shared/_external'));

	OLSKExternalAssets.OLSKExternalAssetsCopyAssetsFromTo([
		'd3-selection',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'os-app/open-compose/libraries'));
})();
