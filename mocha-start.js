const RemoteStorage = require('remotestoragejs');

const LCH_Data = require('./os-app/_shared/LCH_Data/main.js').default;
const LCHDocumentStorage = require('./os-app/_shared/LCHDocument/storage.js');
const LCHSettingStorage = require('./os-app/_shared/LCHSetting/storage.js');

(function LCHMochaStorage() {
	if (process.env.OLSK_TESTING_BEHAVIOUR === 'true') {
		return;
	}

	const storageModule = LCH_Data.LCH_DataModule([
		LCHDocumentStorage.LCHDocumentStorageBuild,
		LCHSettingStorage.LCHSettingStorageBuild,
	], {
		OLSKOptionIncludeDebug: true,
	});

	before(function() {
		global.LCHTestingStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		global.LCHTestingStorageClient.access.claim(storageModule.name, 'rw');
	});

	beforeEach(async function() {
		return await global.LCHTestingStorageClient[storageModule.name].__DEBUG._OLSKRemoteStorageReset();
	});
})();
