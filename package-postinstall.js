(function OLSKPostinstallPatchRemoteStorageAuthRedirectURI() {
	let filePath = './node_modules/remotestoragejs/release/remotestorage.js';

	require('fs').writeFileSync(filePath, require('OLSKString').OLSKStringPatch(
		require('fs').readFileSync(filePath, 'utf8'),
		// 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(Authorize.getLocation());',
		'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(h.getLocation())',
		// 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(config.OLSKPatchRemoteStorageAuthRedirectURI || Authorize.getLocation());'
		'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(l.OLSKPatchRemoteStorageAuthRedirectURI || h.getLocation())'
		));
})();

(function OLSKPostinstallPatchSimplecryptoForUITests() {
	if (process.env.NODE_ENV === 'production') {
		return;
	}

	let filePath = './node_modules/simplecrypto/src/simplecrypto.js';

	require('fs').writeFileSync(filePath, require('OLSKString').OLSKStringPatch(
		require('fs').readFileSync(filePath, 'utf8'),
		'var _crypto = window.crypto || window.msCrypto;',
		`var _crypto = window.crypto || window.msCrypto
    if (!_crypto) {
        return
    };`
    ));
})();

(function OLSKPostinstallPatchZombieForUITests() {
	if (process.env.NODE_ENV === 'production') {
		return;
	}

	let filePath = './node_modules/zombie/lib/document.js';

	require('fs').writeFileSync(filePath, require('OLSKString').OLSKStringPatch(
		require('fs').readFileSync(filePath, 'utf8'),
		'this.dispatchEvent(event);',
		`this.dispatchEvent(event)
			const handled = browser.emit('OLSKMessage', data);
		  if (!handled)
		      browser.log('Unhandled message("%s")');`
    ));
})();

(function ROCOHotfixULIDForBrowserTesting() {
	if (process.env.NODE_ENV === 'production') {
		return;
	}

	let filePath = './node_modules/ulid/dist/index.esm.js';
	require('fs').writeFileSync(filePath, require('fs')
		.readFileSync(filePath, 'utf8')
		.replace(
			'console.error("secure crypto unusable, falling back to insecure Math.random()!");',
			'// console.error("secure crypto unusable, falling back to insecure Math.random()!");')
		.replace(
			'var ulid = factory();',
			'// var ulid = factory();')
		.replace(
			'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory, ulid };',
			'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory };')
	);
})();

(function OLSKPostinstallExternalAssets() {
	const OLSKAssets = require('./node_modules/OLSKApp/modules/OLSKAssets/main.js');
	const pathPackage = require('path');

	OLSKAssets.OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'codemirror',
		'OLSKRouting',
		'OLSKLayout',
		'OLSKServiceWorker',
		'fuzzysort',
		'clipboard',
		'jszip',
		'file-saver',
		'simplecrypto',
		'OLSKRemoteStorage',
		'OLSKStorageWidget',

		// pass tests
		'OLSKInputWrapper',
		'OLSKReloadButton',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'os-app/_shared/__external'));
})();

(function OLSKPostinstallRollup() {
	if (process.env.NODE_ENV !== 'production') {
		return;
	}

	require('child_process').execSync('npm run svelte-build');
})();
