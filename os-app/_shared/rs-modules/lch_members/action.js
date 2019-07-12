const LCHMembersModel = typeof require === 'undefined' ? window.LCHMembersModel : require('./model.js');
const LCHMembersMetal = typeof require === 'undefined' ? window.LCHMembersMetal : require('./metal.js');
const ULIDPackage = typeof require === 'undefined' ? window.ULID : require('ulid');

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.LCHMembersAction = global.LCHMembersAction || {})));
}(this, (function (exports) { 'use strict'; Object.defineProperty(exports, '__esModule', { value: true }); Object.assign(exports, {
	LCHMembersActionCreate: async function(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		let creationDate = new Date();

		return await LCHMembersMetal.LCHMembersMetalWrite(storageClient, Object.assign(inputData, {
			LCHMemberID: ULIDPackage.ulid(),
			LCHMemberCreationDate: creationDate,
			LCHMemberModificationDate: creationDate,
		}));
	},
	LCHMembersActionRead: async function(storageClient, inputData) {
		return await LCHMembersMetal.LCHMembersMetalRead(storageClient, inputData);
	},
	LCHMembersActionUpdate: async function(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputInvalid'));
		}

		return await LCHMembersMetal.LCHMembersMetalWrite(storageClient, Object.assign(inputData, {
			LCHMemberModificationDate: new Date(),
		}));
	},
	LCHMembersActionDelete: async function(storageClient, inputData) {
		return await LCHMembersMetal.LCHMembersMetalDelete(storageClient, inputData);
	},
}); })));
