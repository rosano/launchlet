import LCHSettingModel from './model.js';

const mod = {

	LCHSettingStorageCollectionName () {
		return 'lch_settings';
	},

	LCHSettingStorageCollectionType () {
		return 'lch_setting';
	},

	LCHSettingStorageCollectionPath () {
		return mod.LCHSettingStorageCollectionName() + '/';
	},

	LCHSettingStorageObjectPath (inputData) {
		if (LCHSettingModel.LCHSettingModelErrorsFor(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		return mod.LCHSettingStorageCollectionPath() + inputData.LCHSettingKey;
	},

	LCHSettingStorageBuild  (privateClient, publicClient, changeDelegate) {
		return {
			OLSKRemoteStorageCollectionName: mod.LCHSettingStorageCollectionName(),
			OLSKRemoteStorageCollectionType: mod.LCHSettingStorageCollectionType(),
			OLSKRemoteStorageCollectionModelErrors: Object.entries(LCHSettingModel.LCHSettingModelErrorsFor({})).map(function (e) {
				if (!Object.keys(LCHSettingModel.LCHSettingModelErrorsFor({})).includes(e[0])) {
					e[1].push('__RSOptional');
				}

				return e;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {}),
			OLSKRemoteStorageCollectionExports: {
				
				async _LCHSettingStorageWrite (inputData) {
					if (typeof inputData !== 'object' || inputData === null) {
						return Promise.reject(new Error('LCHErrorInputNotValid'));
					}

					let errors = LCHSettingModel.LCHSettingModelErrorsFor(inputData);
					if (errors) {
						return Promise.resolve({
							LCHErrors: errors,
						});
					}

					await privateClient.storeObject(mod.LCHSettingStorageCollectionType(), mod.LCHSettingStorageObjectPath(inputData), inputData);

					return inputData;
				},

				_LCHSettingStorageRead (inputData) {
					if (typeof inputData !== 'string') {
						throw new Error('LCHErrorInputNotValid');
					}

					return privateClient.getObject(mod.LCHSettingStorageObjectPath({
						LCHSettingKey: inputData,
						LCHSettingValue: '',
					}));
				},

				_LCHSettingStorageList () {
					return privateClient.getAll(mod.LCHSettingStorageCollectionPath(), false);
				},

				_LCHSettingStorageDelete (inputData) {
					if (typeof inputData !== 'string') {
						throw new Error('LCHErrorInputNotValid');
					}

					return privateClient.remove(mod.LCHSettingStorageObjectPath({
						LCHSettingKey: inputData,
						LCHSettingValue: '',
					}));
				},

			},
		};
	},

	LCHSettingStorageWrite (storageClient, inputData) {
		return storageClient.launchlet[mod.LCHSettingStorageCollectionName()]._LCHSettingStorageWrite(inputData);
	},

	LCHSettingStorageRead (storageClient, inputData) {
		return storageClient.launchlet[mod.LCHSettingStorageCollectionName()]._LCHSettingStorageRead(inputData);
	},

	LCHSettingStorageList (storageClient) {
		return storageClient.launchlet[mod.LCHSettingStorageCollectionName()]._LCHSettingStorageList();
	},

	LCHSettingStorageDelete (storageClient, inputData) {
		return storageClient.launchlet[mod.LCHSettingStorageCollectionName()]._LCHSettingStorageDelete(inputData);
	},

};

export default mod;
