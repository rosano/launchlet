const RemoteStorage = require('remotestoragejs');

const LCH_Data = require('./os-app/_shared/LCH_Data/main.js').default;
const LCHDocumentStorage = require('./os-app/_shared/LCHDocument/storage.js').default;
const LCHSettingStorage = require('./os-app/_shared/LCHSetting/storage.js').default;

(function LCHMochaStorage() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
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

	beforeEach(function() {
		return global.LCHTestingStorageClient[storageModule.name].__DEBUG.__OLSKRemoteStorageReset();
	});
})();

(function LCHMochaStubs() {
	Object.entries({

		StubDocumentObjectValid () {
			return {
				LCHDocumentID: 'alfa',
				LCHDocumentCallbackArgs: 'bravo',
				LCHDocumentCallbackBody: 'charlie',
				LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
				LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
			};
		},

		StubSettingObjectValid () {
			return {
				LCHSettingKey: 'alfa',
				LCHSettingValue: 'bravo',
			};
		},

		uStubTwoItems () {
			return [
				{
					LCHRecipeName: 'alfa',
					LCHRecipeCallback: function () {
						return document.getElementById('TestRecipeOutput').value = 'alfa';
					},
				},
				{
					LCHRecipeName: 'bravo',
					LCHRecipeCallback: function () {
						return document.getElementById('TestRecipeOutput').value = 'bravo';
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

		uStubStringifyAll (inputData) {
			return JSON.stringify(Object.fromEntries(Object.entries(inputData).map(function (e) {
				if (e[0] === 'LCHOptionRecipes') {
					e[1] = e[1].map(function (e) {
						return Object.assign(e, {
							LCHRecipeCallback: `(${ e.LCHRecipeCallback.toString() })`,
							LCHRecipeIsExcluded: e.LCHRecipeIsExcluded ? `(${ e.LCHRecipeIsExcluded.toString() })` : undefined,
						});
					});
				};
				return e;
			})));
		},

	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
