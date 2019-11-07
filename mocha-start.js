const LCHStorageModule = require('./os-app/_shared/LCHStorageModule/main.js');
const LCHDocumentStorage = require('./os-app/_shared/LCHDocument/storage.js');
const LCHSettingStorage = require('./os-app/_shared/LCHSetting/storage.js');

(function LCHMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	before(function(done) {
		global.LCHTestingStorageClient = require('./os-app/_shared/LCHStorageClient/main.js').LCHStorageClient({
			modules: [
				LCHStorageModule.LCHStorageModule([
					LCHDocumentStorage.LCHDocumentStorage,
					LCHSettingStorage.LCHSettingStorage,
				].map(function (e) {
					return {
						LCHCollectionStorageGenerator: e,
						LCHCollectionChangeDelegate: null,
					};
				}))
			],
		});

		done();
	});

	beforeEach(async function() {
		await uSerial([
			'lch_documents',
			'lch_settings',
		].map(async function (e) {
			return await Promise.all(Object.keys(await global.LCHTestingStorageClient.launchlet[e].listObjects()).map(global.LCHTestingStorageClient.launchlet[e].deleteObject));
		}));
	});
})();
