//# OLSKMochaReplaceES6Import

(function OLSKMochaReplaceES6Import() {
	require('OLSKTesting')._OLSKTestingMochaReplaceES6Import();
})();

//# LCHMochaSetup

(function LCHMochaSetup() {
	let moduleSlugs = [
		'lch_members',
	];

	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	before(function(done) {
		global.LCHTestingStorageClient = require('./os-app/_shared/LCHStorageClient/main.js').LCHStorageClientForModules(moduleSlugs.map(function (e) {
			return require(`./os-app/_shared/rs-modules/${ e }/rs-module.js`).RSModuleProtocolModuleForChangeDelegate(null);
		}));

		done();
	});

	beforeEach(async function() {
		await uSerial(moduleSlugs.map(async function (e) {
			return await Promise.all(Object.keys(await global.LCHTestingStorageClient[e].listObjects()).map(global.LCHTestingStorageClient[e].deleteObject));
		}));
	});
})();

//# OLSKMochaErrors

(function OLSKMochaErrors() {
	process.on('unhandledRejection', () => {
		// console.log('Unhandledd Rejection at:', arguments)
		// Recommended: send the information to sentry.io
		// or whatever crash reporting service you use
	});
})();
