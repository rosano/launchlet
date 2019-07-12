let moduleSlugs = [
	'lch_members',
];

const uSerial = function (inputData) {
	return inputData.reduce(async function (coll, e) {
		return e.then(Array.prototype.concat.bind(await coll));
	}, Promise.resolve([]));
};

before(function(done) {
	global.WKCTestingStorageClient = require('./os-app/_shared/LCHStorageClient/storage.js').LCHStorageClientForChangeDelegateMap(moduleSlugs.reduce(function (coll, e) {
		return (coll[e] = null) || coll;
	}, {}));

	done();
});

beforeEach(async function() {
	await uSerial(moduleSlugs.map(async function (e) {
		return await Promise.all(Object.keys(await global.WKCTestingStorageClient[e].listObjects()).map(global.WKCTestingStorageClient[e].deleteObject));
	}));
});

process.on('unhandledRejection', (reason, promise) => {
	// console.log('Unhandledd Rejection at:', reason, promise)
	// Recommended: send the information to sentry.io
	// or whatever crash reporting service you use
});
