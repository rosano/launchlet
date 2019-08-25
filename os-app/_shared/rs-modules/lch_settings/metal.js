(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHSettingsMetal = global.LCHSettingsMetal || {})));
}(this, (function (exports) { 'use strict';

	const LCHSettingsModel = typeof require === 'undefined' ? window.LCHSettingsModel : require('./model.js');

	//_ LCHSettingsMetalWrite

	exports.LCHSettingsMetalWrite = async function(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		let errors = LCHSettingsModel.LCHSettingsModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				LCHErrors: errors,
			});
		}

		return await storageClient.lch_settings.writeObject(inputData.LCHSettingKey, inputData);
	};

	//_ LCHSettingsMetalRead

	exports.LCHSettingsMetalRead = async function(storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		return await storageClient.lch_settings.readObject(inputData);
	};

	//_ LCHSettingsMetalList

	exports.LCHSettingsMetalList = async function(storageClient) {
		return await storageClient.lch_settings.listObjects();
	};

	//_ LCHSettingsMetalDelete

	exports.LCHSettingsMetalDelete = async function(storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		return await storageClient.lch_settings.deleteObject(inputData);
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
