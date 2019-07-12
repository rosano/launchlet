const LCHMembersModel = typeof require === 'undefined' ? window.LCHMembersModel : require('./model.js');

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHMembersMetal = global.LCHMembersMetal || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); Object.assign(exports, {
	LCHMembersMetalWrite: async function(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		let errors = LCHMembersModel.LCHMembersModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				LCHErrors: errors,
			});
		}

		return await storageClient.lch_members.writeObject(inputData.LCHMemberID, inputData);
	},
	LCHMembersMetalRead: async function(storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		return LCHMembersModel.LCHMembersModelPostJSONParse(await storageClient.lch_members.readObject(inputData));
	},
	LCHMembersMetalList: async function(storageClient) {
		let outputData = await storageClient.lch_members.listObjects();

		for (let key in outputData) {
			LCHMembersModel.LCHMembersModelPostJSONParse(outputData[key]);
		}
		
		return outputData;
	},
	LCHMembersMetalDelete: async function(storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		return await storageClient.lch_members.deleteObject(inputData);
	},
}); })));
