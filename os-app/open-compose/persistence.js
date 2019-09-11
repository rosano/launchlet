import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

import * as LCHStorageClient from '../_shared/LCHStorageClient/main.js';
import { LCHStorageModule } from '../_shared/LCHStorageModule/main.js';
import { LCHDocumentStorage } from '../_shared/LCHDocument/storage.js';
import { LCHSettingStorage } from '../_shared/LCHSetting/storage.js';

import { LCHComposeSort } from './ui-logic.js';

import { writable } from 'svelte/store';

export const DocumentsAllStore = writable([]);
export const DocumentSelectedStore = writable(null);
export const isLoading = writable(true);

let _DocumentSelected;
DocumentSelectedStore.subscribe(function (val) {
	_DocumentSelected = val;
});
export const storageClient = LCHStorageClient.LCHStorageClientForModules([
	LCHStorageModule([
		LCHDocumentStorage,
		LCHSettingStorage,
		].map(function (e) {
			return {
				LCHCollectionStorageGenerator: e,
				LCHCollectionChangeDelegate: e === LCHDocumentStorage ? {
					OLSKChangeDelegateAdd: function (inputData) {
						// console.log('OLSKChangeDelegateAdd', inputData);
						DocumentsAllStore.update(function (val) {
							return val.filter(function (e) { // @Hotfix Dropbox sending DelegateAdd
								return e.LCHDocumentID !== inputData.LCHDocumentID;
							}).concat(inputData).sort(LCHComposeSort);
						});

						modelDidChange.set(Date.now());
					},
					OLSKChangeDelegateRemove: function (inputData) {
						// console.log('OLSKChangeDelegateRemove', inputData);

						if (_DocumentSelected && (_DocumentSelected.LCHDocumentID === inputData.LCHDocumentID)) {
							DocumentSelectedStore.set(null);
						}

						DocumentsAllStore.update(function (val) {
							return val.filter(function (e) {
								return e.LCHDocumentID !== inputData.LCHDocumentID;
							});
						});

						modelDidChange.set(Date.now());
					},
					OLSKChangeDelegateUpdate: function (inputData) {
						// console.log('OLSKChangeDelegateUpdate', inputData);
						if (_DocumentSelected && (_DocumentSelected.LCHDocumentID === inputData.LCHDocumentID)) {
							DocumentSelectedStore.update(function (val) {
								return Object.assign(val, inputData);
							});
						}

						DocumentsAllStore.update(function (val) {
							return val.map(function (e) {
								return Object.assign(e, e.LCHDocumentID === inputData.LCHDocumentID ? inputData : {});
							});
						});

						modelDidChange.set(Date.now());
					},
				} : null,
			}
		})),
]);

let remoteStorage = storageClient.remoteStorage;

remoteStorage.setApiKeys({
	dropbox: window.atob(window.OLSKPublicConstants('LCHDropboxAppKey')),
	googledrive: window.atob(window.OLSKPublicConstants('LCHGoogleClientKey')),
});

remoteStorage.on('ready', async () => {
	if (!_LCHIsTestingBehaviour()) {
		console.debug('ready', arguments);
	}

	isLoading.set(false);

	await remoteStorage.launchlet.lch_documents.init();

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
