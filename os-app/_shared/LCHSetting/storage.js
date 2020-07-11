import LCHSettingModel from './model.js';

const kType = 'lch_setting';
const kCollection = 'lch_settings';

const mod = {

	LCHSettingStoragePath (inputData) {
		return `${ kCollection }/${ inputData || '' }`;
	},

	LCHSettingStorageBuild  (privateClient, publicClient, changeDelegate) {
		return {
			OLSKRemoteStorageCollectionName: kCollection,
			OLSKRemoteStorageCollectionType: kType,
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
					return privateClient.getAll(mod.LCHSettingStoragePath(), false);
				},
				async LCHStorageWrite (param1, param2) {
					await privateClient.storeObject(kType, mod.LCHSettingStoragePath(param1), param2);
					return param2;
				},
				LCHStorageRead (inputData) {
					return privateClient.getObject(mod.LCHSettingStoragePath(inputData));
				},
				LCHStorageDelete (inputData) {
					return privateClient.remove(mod.LCHSettingStoragePath(inputData));
				},
			},
		};
	},

};

export default mod;
