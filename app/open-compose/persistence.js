import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

import * as LCHStorageClient from '../_shared/LCHStorageClient/main.js';
import { LCHStorageModule } from '../_shared/LCHStorageModule/main.js';
import { LCHDocumentStorage } from '../_shared/LCHDocument/storage.js';
import { LCHDocumentActionList } from '../_shared/LCHDocument/action.js';
import { LCHSettingStorage } from '../_shared/LCHSetting/storage.js';

import { LCHComposeSort } from './ui-logic.js';
import { modelDidChange } from './model.js';

import { writable } from 'svelte/store';

export const DocumentsAllStore = writable([]);
export const DocumentSelectedStore = writable(null);
export const isLoading = writable(true);

let _DocumentSelected;
DocumentSelectedStore.subscribe(function (val) {
	_DocumentSelected = val;
});
export const storageClient = LCHStorageClient.LCHStorageClient({
	modules: [
		LCHStorageModule([
			LCHDocumentStorage,
			LCHSettingStorage,
			].map(function (e) {
				return {
					LCHCollectionStorageGenerator: e,
					LCHCollectionChangeDelegate: e === LCHDocumentStorage ? {
						OLSKChangeDelegateCreate: function (inputData) {
							// console.log('OLSKChangeDelegateCreate', inputData);

							DocumentsAllStore.update(function (val) {
								return val.filter(function (e) { // @Hotfix Dropbox sending DelegateAdd
									return e.LCHDocumentID !== inputData.LCHDocumentID;
								}).concat(inputData).sort(LCHComposeSort);
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
						OLSKChangeDelegateDelete: function (inputData) {
							// console.log('OLSKChangeDelegateDelete', inputData);

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
					} : null,
				}
			})),
	],
	OLSKPatchRemoteStorageAuthRedirectURI: _LCHIsTestingBehaviour() ? undefined : window.location.origin + window.OLSKCanonicalFor('LCHComposeRoute'),
});

let remoteStorage = storageClient.remoteStorage;
remoteStorage.setApiKeys(window.OLSKPublicConstants('LCHDropboxAppKey') ? {
	dropbox: window.atob(window.OLSKPublicConstants('LCHDropboxAppKey')),
	googledrive: window.atob(window.OLSKPublicConstants('LCHGoogleClientKey')),
} : {});

remoteStorage.on('ready', async () => {
	if (!_LCHIsTestingBehaviour()) {
		console.debug('ready', arguments);
	}

	isLoading.set(false);

	await remoteStorage.launchlet.lch_documents.init();
	DocumentsAllStore.set((await LCHDocumentActionList(storageClient)).sort(LCHComposeSort));

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

		document.querySelector('#LCHComposeDebug').classList.add('LCHComposeDebugError');
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