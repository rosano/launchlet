(function OLSKPostinstallHotfix() {
	Object.entries(require('OLSKHotfix').OLSKHotfixPatches(process.env.NODE_ENV)).forEach(function ([path, patches]) {
		if (!require('fs').existsSync(path)) {
			return;
		}
		
		Object.entries(patches).forEach(function ([search, replace]) {
			require('fs').writeFileSync(path, require('OLSKString').OLSKStringPatch(
				require('fs').readFileSync(path, 'utf8'), search, replace));
		});
	});
})();

(function LCHPostinstallPatchOLSKThrottle() {
	let filePath = './node_modules/OLSKThrottle/main.js';

	require('fs').writeFileSync(filePath, require('OLSKString').OLSKStringPatch(
		require('fs').readFileSync(filePath, 'utf8'),
		'delete param1[param2];',
		'// delete param1[param2]',
	));
})();

(function OLSKPostinstallExternalAssets() {
	require('./node_modules/OLSKExpress/modules/OLSKAssets/main.js').OLSKAssetsCopyAssetsFromTo([
		'clipboard',
		'codemirror',
		'file-saver',
		'fuzzysort',
		'jszip',
		'normalize.css',
		'OLSKLanguageSwitcher',
		'OLSKDecor',
		'OLSKRootLink',
		'OLSKRouting',
		'OLSKServiceWorker',
		'OLSKUIAssets',
		'ROCORootLink',
		'simplecrypto',
	], require('path').join(__dirname, 'node_modules'), require('path').join(__dirname, 'os-app/_shared/__external'));
})();
