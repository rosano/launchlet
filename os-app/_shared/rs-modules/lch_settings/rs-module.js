import * as RSModuleShared from '../_shared/main.js';
import * as LCHSettingsModel from './model.js';

export const RSModuleProtocolModuleForChangeDelegate = function (changeDelegate) {
	return {
		name: 'lch_settings',
		builder: function(privateClient, publicClient) {
			privateClient.declareType('lch_setting', RSModuleShared.RSModuleSharedJSONSchemaForErrors(LCHSettingsModel.LCHSettingsModelErrorsFor({})));

			return {
				exports: {
					init: function () {
						return privateClient.cache('');
					},
					listObjects: function () {
						return privateClient.getAll('');
					},
					writeObject: async function (param1, param2) {
						await privateClient.storeObject('lch_setting', param1, param2);
						return param2;
					},
					readObject: function (inputData) {
						return privateClient.getObject(inputData);
					},
					deleteObject: function (inputData) {
						return privateClient.remove(inputData);
					},
				},
			};
		},
	};
};
