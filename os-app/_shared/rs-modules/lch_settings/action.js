(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHSettingsAction = global.LCHSettingsAction || {})));
}(this, (function (exports) { 'use strict';	

	const LCHSettingsMetal = typeof require === 'undefined' ? window.LCHSettingsMetal : require('./metal.js');

	//_ _LCHSettingsActionSet

	exports._LCHSettingsActionSet = async function(storageClient, param1, param2) {
		if (typeof param1 !== 'string') {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		if (typeof param2 === 'undefined') {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		let outputData = (await LCHSettingsMetal.LCHSettingsMetalWrite(storageClient, {
			LCHSettingKey: param1,
			LCHSettingValue: param2,
		}));

		return Promise.resolve(true);
	};

	//_ _LCHSettingsActionGet

	exports._LCHSettingsActionGet = async function(storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		let outputData = await LCHSettingsMetal.LCHSettingsMetalRead(storageClient, inputData);

		return Promise.resolve(outputData ? outputData.LCHSettingValue : undefined);
	};

	//_ LCHSettingsActionProperty

	exports.LCHSettingsActionProperty = async function(storageClient, param1, param2) {
		if (typeof param2 === 'undefined') {
			return await exports._LCHSettingsActionGet(storageClient, param1);
		}

		return await exports._LCHSettingsActionSet(storageClient, param1, param2);
	};

	//_ LCHSettingsActionDelete

	exports.LCHSettingsActionDelete = async function(storageClient, inputData) {
		return await LCHSettingsMetal.LCHSettingsMetalDelete(storageClient, inputData);
	};

	//_ LCHSettingsActionQuery

	exports.LCHSettingsActionQuery = async function(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		return Promise.resolve(Object.values(await LCHSettingsMetal.LCHSettingsMetalList(storageClient)).filter(function(e) {
			if (!Object.keys(inputData).length) {
				return true;
			}

			if (Object.keys(inputData).filter(function (key) {
				return e[key].match(inputData[key]);
			}).length) {
				return true;
			}

			return false;
		}));
	};

	Object.defineProperty(exports, '__esModule', { value: true });

})));
