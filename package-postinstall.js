//# ROCOHotfixZombieForUITests

(function ROCOHotfixZombieForUITests() {
	if (process.env.NODE_ENV === 'production') {
		return;
	}

	let filePath = './node_modules/zombie/lib/document.js';
	require('fs').writeFileSync(filePath, require('fs')
		.readFileSync(filePath, 'utf8')
		.replace(
			'this.dispatchEvent(event);',
			`this.dispatchEvent(event)
			const handled = browser.emit('OLSKMessage', data);
		  if (!handled)
		      browser.log('Unhandled message("%s")');`)
	);
})();

//# ROCOHotfixULIDForBrowserTesting

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

//# OLSKPostinstallExternalAssets

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

		// pass tests
		'OLSKInputWrapper',
		'OLSKReloadButton',
	], pathPackage.join(__dirname, 'node_modules'), pathPackage.join(__dirname, 'os-app/_shared/__external'));
})();

//# OLSKPostinstallRollup

(function OLSKPostinstallRollup() {
	if (process.env.NODE_ENV !== 'production') {
		return;
	}

	require('child_process').execSync('npm run svelte-build');
})();
