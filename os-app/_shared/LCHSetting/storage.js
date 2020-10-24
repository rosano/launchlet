import LCHSettingModel from './model.js';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	LCHSettingStorageCollectionName () {
		return 'lch_settings';
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

					try {
						return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.LCHSettingStorageObjectPath(inputData), inputData);
					} catch (e) {
						return Promise.reject(e);
					}
				},

				_LCHSettingStorageRead (inputData) {
					if (typeof inputData !== 'string') {
						throw new Error('LCHErrorInputNotValid');
					}

					return privateClient.getObject(mod.LCHSettingStorageObjectPath({
						LCHSettingKey: inputData,
						LCHSettingValue: '',
					}), false);
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
