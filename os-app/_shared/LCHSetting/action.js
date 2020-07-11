import LCHSettingsMetal from './metal.js';

const mod = {

	 async _LCHSettingsActionSet (storageClient, param1, param2) {
		if (typeof param1 !== 'string') {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		if (typeof param2 === 'undefined') {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		let outputData = (await LCHSettingsMetal.LCHSettingsMetalWrite(storageClient, {
			LCHSettingKey: param1,
			LCHSettingValue: param2,
		}));

		return Promise.resolve(true);
	},

	 async _LCHSettingsActionGet (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		let outputData = await LCHSettingsMetal.LCHSettingsMetalRead(storageClient, inputData);

		return Promise.resolve(outputData ? outputData.LCHSettingValue : undefined);
	},

	 async LCHSettingsActionProperty (storageClient, param1, param2) {
		if (typeof param2 === 'undefined') {
			return await mod._LCHSettingsActionGet(storageClient, param1);
		}

		return await mod._LCHSettingsActionSet(storageClient, param1, param2);
	},

	 async LCHSettingsActionDelete (storageClient, inputData) {
		return await LCHSettingsMetal.LCHSettingsMetalDelete(storageClient, inputData);
	},

	 async LCHSettingsActionQuery (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
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
	},

};

export default mod;
