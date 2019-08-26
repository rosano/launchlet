import * as LCHSettingsModel from './model.js';

export const LCHSettingsMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	let errors = LCHSettingsModel.LCHSettingModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			LCHErrors: errors,
		});
	}

	return await storageClient.launchlet.lch_settings.writeObject(inputData.LCHSettingKey, inputData);
};

export const LCHSettingsMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return await storageClient.launchlet.lch_settings.readObject(inputData);
};

export const LCHSettingsMetalList = async function(storageClient) {
	return await storageClient.launchlet.lch_settings.listObjects();
};

export const LCHSettingsMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return await storageClient.launchlet.lch_settings.deleteObject(inputData);
};
