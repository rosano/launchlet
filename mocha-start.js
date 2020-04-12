const RemoteStorage = require('remotestoragejs');

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

	const storageModule = LCHStorageModule.LCHStorageModule([
		LCHDocumentStorage.LCHDocumentStorage,
		LCHSettingStorage.LCHSettingStorage,
	]);

	before(function() {
		global.LCHTestingStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		global.LCHTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(async function() {
		await uSerial(Object.keys(global.LCHTestingStorageClient[storageModule.name]).map(async function (e) {
			return await Promise.all(Object.keys(await global.LCHTestingStorageClient[storageModule.name][e].LCHStorageList()).map(global.LCHTestingStorageClient[storageModule.name][e].LCHStorageDelete));
		}));
	});
})();
