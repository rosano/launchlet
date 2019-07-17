//# OLSKBuildExternalAssets

(function OLSKBuildExternalAssets() {
	const OLSKAssets = require('./node_modules/OldSkool/modules/OLSKAssets/main.js');
	const pathPackage = require('path');

	OLSKAssets.OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'remotestoragejs',
		'remotestorage-widget',
		'codemirror',
		'dragula',
		'd3-selection',
		'OLSKInternational',
		'OLSKString',
		'OLSKRouting',
		'OLSKThrottle',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'os-app/_shared/_external'));

	OLSKAssets.OLSKAssetsCopyAssetsFromTo([
		'd3-selection',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'os-app/open-pendext/_external'));
})();
