import LCHSettingModel from './model.js';

const kType = 'lch_setting';
const kCollection = 'lch_settings';

export const LCHSettingStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../LCHFormula/main.js';
export const LCHSettingStorageBuild = function (privateClient, publicClient, changeDelegate) {
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
				return privateClient.getAll(LCHSettingStoragePath(), false);
			},
			async LCHStorageWrite (param1, param2) {
				await privateClient.storeObject(kType, LCHSettingStoragePath(param1), param2);
				return param2;
			},
			LCHStorageRead (inputData) {
				return privateClient.getObject(LCHSettingStoragePath(inputData));
			},
			LCHStorageDelete (inputData) {
				return privateClient.remove(LCHSettingStoragePath(inputData));
			},
		},
	};
};


