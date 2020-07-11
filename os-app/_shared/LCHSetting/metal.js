import * as LCHSettingsModel from './model.js';

const mod = {

	async LCHSettingMetalWrite (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		let errors = LCHSettingsModel.LCHSettingModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				LCHErrors: errors,
			});
		}

		return await storageClient.launchlet.lch_settings.LCHStorageWrite(inputData.LCHSettingKey, inputData);
	},

	async LCHSettingMetalRead (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		return await storageClient.launchlet.lch_settings.LCHStorageRead(inputData);
	},

	async LCHSettingMetalList (storageClient) {
		return await storageClient.launchlet.lch_settings.LCHStorageList();
	},

	async LCHSettingMetalDelete (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		return await storageClient.launchlet.lch_settings.LCHStorageDelete(inputData);
	},

};

export default mod;
