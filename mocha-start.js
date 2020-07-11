const RemoteStorage = require('remotestoragejs');

const LCH_Data = require('./os-app/_shared/LCH_Data/main.js').default;
const LCHDocumentStorage = require('./os-app/_shared/LCHDocument/storage.js').default;
const LCHSettingStorage = require('./os-app/_shared/LCHSetting/storage.js').default;

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

(function LCHMochaStubs() {
	if (process.env.OLSK_TESTING_BEHAVIOUR !== 'true') {
		return;
	}

	Object.entries({
		uStubTwoItems () {
			return [
				{
					LCHRecipeName: 'alfa',
					LCHRecipeCallback: function () {
						return document.querySelector('.TestRecipeOutput').value = 'alfa';
					},
				},
				{
					LCHRecipeName: 'bravo',
					LCHRecipeCallback: function () {
						return document.querySelector('.TestRecipeOutput').value = 'bravo';
					},
				},
			];
		},

		uStubStringify (inputData) {
			return JSON.stringify(inputData.map(function (e) {
				return Object.assign(e, {
					LCHRecipeCallback: `(${ e.LCHRecipeCallback.toString() })`,
					LCHRecipeIsExcluded: e.LCHRecipeIsExcluded ? `(${ e.LCHRecipeIsExcluded.toString() })` : undefined,
				});
			}));
		},
	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();


(function KVCMochaStubs() {
	Object.entries({
		StubDocumentObjectValid: function() {
			return {
				LCHDocumentID: 'alfa',
				LCHDocumentCallbackArgs: 'bravo',
				LCHDocumentCallbackBody: 'charlie',
				LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
				LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
			};
		},
	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
