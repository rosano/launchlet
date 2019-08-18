import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

import * as LCHStorageClient from '../_shared/LCHStorageClient/main.js';
import * as RSModuleProtocol_lch_documents from '../_shared/rs-modules/lch_documents/rs-module.js';
import { LCHComposeLogicSort } from './ui-logic.js';

import * as LCHFormulasAction from '../_shared/rs-modules/lch_documents/action.js';

import { writable } from 'svelte/store';

export const membersAll = writable([]);
export const memberSelected = writable(null);
export const modelDidChange = writable(null);

let _memberSelected;
memberSelected.subscribe(function (val) {
	_memberSelected = val;
});
export const storageClient = LCHStorageClient.LCHStorageClientForModules([
	RSModuleProtocol_lch_documents.RSModuleProtocolModuleForChangeDelegate({
		OLSKChangeDelegateAdd: function (inputData) {
			// console.log('OLSKChangeDelegateAdd', inputData);
			membersAll.update(function (val) {
				return val.filter(function (e) { // @Hotfix Dropbox sending DelegateAdd
					return e.LCHDocumentID !== inputData.LCHDocumentID;
				}).concat(inputData).sort(LCHComposeLogicSort);
			});

			modelDidChange.set(Date.now());
		},
		OLSKChangeDelegateRemove: function (inputData) {
			// console.log('OLSKChangeDelegateRemove', inputData);

			if (_memberSelected && (_memberSelected.LCHDocumentID === inputData.LCHDocumentID)) {
				memberSelected.set(null);
			}

			membersAll.update(function (val) {
				return val.filter(function (e) {
					return e.LCHDocumentID !== inputData.LCHDocumentID;
				});
			});

			modelDidChange.set(Date.now());
		},
		OLSKChangeDelegateUpdate: function (inputData) {
			// console.log('OLSKChangeDelegateUpdate', inputData);
			if (_memberSelected && (_memberSelected.LCHDocumentID === inputData.LCHDocumentID)) {
				memberSelected.update(function (val) {
					return Object.assign(val, inputData);
				});
			}

			membersAll.update(function (val) {
				return val.map(function (e) {
					return Object.assign(e, e.LCHDocumentID === inputData.LCHDocumentID ? inputData : {});
				});
			});

			modelDidChange.set(Date.now());
		},
	}),
]);

let remoteStorage = storageClient.remoteStorage;

remoteStorage.setApiKeys({
	dropbox: window.atob(window.OLSKPublicConstants('LCHDropboxAppKey')),
});

remoteStorage.on('ready', async () => {
	if (!_LCHIsTestingBehaviour()) {
		console.debug('ready', arguments);
	}

	await remoteStorage.lch_documents.init();

	// setupFinalize(); remove loading class
});

(function SetupStorageClientLogging() {
	remoteStorage.on('not-connected', () => {
		if (!_LCHIsTestingBehaviour()) {
			console.debug('not-connected', arguments);
		}
	});

	remoteStorage.on('disconnected', () => {
		if (!_LCHIsTestingBehaviour()) {
			console.debug('disconnected', arguments);
		}
	});

	remoteStorage.on('connected', () => {
		if (!_LCHIsTestingBehaviour()) {
			console.debug('connected', arguments);
		}
	});

	remoteStorage.on('error', (error) => {
		if (!_LCHIsTestingBehaviour()) {
			console.debug('error', error);
		}

		document.querySelector('#LCHComposeStorageWidget').classList.add('remotestorage-widget-error-state');
	});

	remoteStorage.on('network-offline', () => {
		if (!_LCHIsTestingBehaviour()) {
			console.debug('network-offline', arguments);
		}
	});

	remoteStorage.on('network-online', () => {
		if (!_LCHIsTestingBehaviour()) {
			console.debug('network-online', arguments);
		}
	});

	remoteStorage.on('sync-done', () => {
		if (!_LCHIsTestingBehaviour()) {
			console.debug('sync-done', arguments);
		}
	});
})();
