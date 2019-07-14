import * as LCHStorageClient from '../_shared/LCHStorageClient/main.js';
import * as RSModuleProtocol_lch_members from '../_shared/rs-modules/lch_members/rs-module.js';
import * as LCHComposeLogic from '../open-compose/ui-logic.js';

import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';

import { writable } from 'svelte/store';

export const membersAll = writable([]);
export const memberSelected = writable(null);

export const storageClient = LCHStorageClient.LCHStorageClientForModules([
	RSModuleProtocol_lch_members.RSModuleProtocolModuleForChangeDelegate({
	OLSKChangeDelegateAdd: function (inputData) {
		console.log('OLSKChangeDelegateAdd', inputData);
		return membersAll.update(function (val) {
			return val.concat(inputData).sort(LCHComposeLogic.default.LCHComposeLogicSort);
		});
	},
	OLSKChangeDelegateRemove: function (inputData) {
		console.log('OLSKChangeDelegateRemove', inputData);
		// return membersAll = membersAll.filter(function (e) {
		// 	return e.LCHNoteID !== inputData.LCHNoteID;
		// })
	},
	OLSKChangeDelegateUpdate: function (inputData) {
		console.log('OLSKChangeDelegateUpdate', inputData);
		// return membersAll = membersAll.map(function (e) {
		// 	return Object.assign(e, e.LCHNoteID === inputData.LCHNoteID ? inputData : {});
		// }));
	},
}),
]);

let remoteStorage = storageClient.remoteStorage;

remoteStorage.on('ready', async () => {
	console.debug('ready', arguments);

	await remoteStorage.lch_members.init();

	// setupFinalize(); remove loading class
});

(function SetupStorageClientLogging() {
	remoteStorage.on('not-connected', () => {
		console.debug('not-connected', arguments);
	});

	remoteStorage.on('disconnected', () => {
		console.debug('disconnected', arguments);
	});

	remoteStorage.on('error', () => {
		console.debug('error', arguments);
	});

	remoteStorage.on('connected', () => {
		console.debug('connected', arguments);
	});

	remoteStorage.on('connected', () => {
		console.debug('connected', arguments);
	});

	remoteStorage.on('error', () => {
		console.debug('error', arguments);
	});

	remoteStorage.on('network-offline', () => {
		console.debug('network-offline', arguments);
	});

	remoteStorage.on('network-online', () => {
		console.debug('network-online', arguments);
	});

	remoteStorage.on('sync-done', () => {
		console.debug('sync-done', arguments);
	});
})();
