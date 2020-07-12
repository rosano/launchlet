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
				LCHStorageList () {
					return privateClient.getAll(mod.LCHSettingStorageCollectionPath(), false);
				},
				async LCHStorageWrite (param1, param2) {
					await privateClient.storeObject(mod.LCHSettingStorageCollectionType(), mod.LCHSettingStorageObjectPath(param2), param2);
					return param2;
				},
				LCHStorageRead (inputData) {
					return privateClient.getObject(mod.LCHSettingStorageObjectPath({
						LCHSettingKey: inputData,
						LCHSettingValue: '',
					}));
				},
				LCHStorageDelete (inputData) {
					return privateClient.remove(mod.LCHSettingStorageObjectPath({
						LCHSettingKey: inputData,
						LCHSettingValue: '',
					}));
				},
			},
		};
	},

};

export default mod;
