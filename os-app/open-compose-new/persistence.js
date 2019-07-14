import * as LCHStorageClient from '../_shared/LCHStorageClient/main.js';
import * as RSModuleProtocol_lch_members from '../_shared/rs-modules/lch_members/rs-module.js';
import * as LCHComposeLogic from '../open-compose/ui-logic.js';

import * as LCHMembersAction from '../_shared/rs-modules/lch_members/action.js';

import { writable } from 'svelte/store';

export const membersAll = writable([]);
export const memberSelected = writable(null);
export const modelDidChange = writable(null);

let _memberSelected;
memberSelected.subscribe(function (val) {
	_memberSelected = val;
});
export const storageClient = LCHStorageClient.LCHStorageClientForModules([
	RSModuleProtocol_lch_members.RSModuleProtocolModuleForChangeDelegate({
		OLSKChangeDelegateAdd: function (inputData) {
			// console.log('OLSKChangeDelegateAdd', inputData);
			membersAll.update(function (val) {
				return val.filter(function (e) { // @Hotfix Dropbox sending DelegateAdd
					return e.LCHMemberID !== inputData.LCHMemberID;
				}).concat(inputData).sort(LCHComposeLogic.default.LCHComposeLogicSort);
			});

			modelDidChange.set(Date.now());
		},
		OLSKChangeDelegateRemove: function (inputData) {
			// console.log('OLSKChangeDelegateRemove', inputData);

			if (_memberSelected && (_memberSelected.LCHMemberID === inputData.LCHMemberID)) {
				memberSelected.set(null);
			}

			membersAll.update(function (val) {
				return val.filter(function (e) {
					return e.LCHMemberID !== inputData.LCHMemberID;
				});
			});

			modelDidChange.set(Date.now());
		},
		OLSKChangeDelegateUpdate: function (inputData) {
			// console.log('OLSKChangeDelegateUpdate', inputData);
			if (_memberSelected && (_memberSelected.LCHMemberID === inputData.LCHMemberID)) {
				memberSelected.update(function (val) {
					return Object.assign(val, inputData);
				});
			}

			membersAll.update(function (val) {
				return val.map(function (e) {
					return Object.assign(e, e.LCHMemberID === inputData.LCHMemberID ? inputData : {});
				});
			});

			modelDidChange.set(Date.now());
		},
	}),
]);

let remoteStorage = storageClient.remoteStorage;

remoteStorage.setApiKeys({
	dropbox: window.atob(window.OLSKPublicConstants('LCHDropboxAppKey')),
})

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

	remoteStorage.on('connected', () => {
		console.debug('connected', arguments);
	});

	remoteStorage.on('error', (error) => {
		console.debug('error', error);

		document.querySelector('#LCHComposeStorageWidget').classList.add('remotestorage-widget-error-state');
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
