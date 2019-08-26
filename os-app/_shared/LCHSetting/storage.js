import * as LCHSettingModel from './model.js';

const kType = 'lch_setting';
const kCollection = 'lch_settings';

export const LCHSettingStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../LCHFormula/main.js';
export const LCHSettingStorage = function (privateClient, publicClient, changeDelegate) {
	return {
		LCHStorageCollection: kCollection,
		LCHStorageType: kType,
		LCHStorageModelErrors: LCHSettingModel.LCHSettingModelErrorsFor({}),
		LCHStorageExports: {
			init: function () {
				return privateClient.cache(LCHSettingStoragePath());
			},
			listObjects: function () {
				return privateClient.getAll(LCHSettingStoragePath());
			},
			writeObject: async function (param1, param2) {
				await privateClient.storeObject(kType, LCHSettingStoragePath(param1), param2);
				return param2;
			},
			readObject: function (inputData) {
				return privateClient.getObject(LCHSettingStoragePath(inputData));
			},
			deleteObject: function (inputData) {
				return privateClient.remove(LCHSettingStoragePath(inputData));
			},
		},
	};
};


