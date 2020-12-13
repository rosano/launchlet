import LCHDocumentModel from './model.js';
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	LCHDocumentStorageCollectionName () {
		return 'lch_documents';
	},

	LCHDocumentStorageCollectionPath () {
		return mod.LCHDocumentStorageCollectionName() + '/';
	},

	LCHDocumentStorageObjectPath (inputData) {
		if (LCHDocumentModel.LCHDocumentModelErrorsFor(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		return mod.LCHDocumentStorageCollectionPath() + inputData.LCHDocumentID;
	},

	LCHDocumentStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		const item = {
			LCHDocumentID: inputData.split('/')[1],
			LCHDocumentCallbackBody: '',
			LCHDocumentCreationDate: new Date(),
			LCHDocumentModificationDate: new Date(),
		};

		return inputData === mod.LCHDocumentStorageObjectPath(item);
	},

	LCHDocumentStorageBuild (privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}
			
			const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

			if (!delegateMethod) {
				return;
			}

			if (typeof changeDelegate[delegateMethod] !== 'function') {
				return console.warn(`${ delegateMethod } not function`);
			}

			if (!mod.LCHDocumentStorageMatch(event.relativePath)) {
				return;
			}

			if (event.origin === 'remote' && event.oldValue && event.newValue) {
				// #hotfix-remotestorage-remote-event-from-local-change
				if (JSON.stringify(event.oldValue) === JSON.stringify(event.newValue)) {
					return console.info('RemoteIdentical', event);
				}
			}

			changeDelegate[delegateMethod](OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateData(delegateMethod, event)));
		});

		const OLSKRemoteStorageCollectionExports = {

			async _LCHDocumentStorageWrite (inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('LCHErrorInputNotValid'));
				}

				let errors = LCHDocumentModel.LCHDocumentModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						LCHErrors: errors,
					});
				}

				if (window.OLSK_DEMO) {
					return inputData;
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.LCHDocumentStorageObjectPath(inputData), inputData);
				} catch (e) {
					return Promise.reject(e);
				}
			},

			async _LCHDocumentStorageList () {
				let outputData = await privateClient.getAll(mod.LCHDocumentStorageCollectionPath(), false);

				for (let key in outputData) {
					OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(outputData[key]);
				}
				
				return outputData;
			},
			
			_LCHDocumentStorageDelete (inputData) {
				if (typeof inputData !== 'string') {
					return Promise.reject(new Error('LCHErrorInputNotValid'));
				}
				
				return privateClient.remove(mod.LCHDocumentStorageCollectionPath() + inputData);
			},

		};

		return {
			OLSKRemoteStorageCollectionName: mod.LCHDocumentStorageCollectionName(),
			OLSKRemoteStorageCollectionExports,
		};
	},

	LCHDocumentStorageWrite (storageClient, inputData) {
		return storageClient.launchlet[mod.LCHDocumentStorageCollectionName()]._LCHDocumentStorageWrite(inputData);
	},

	LCHDocumentStorageList (storageClient) {
		return storageClient.launchlet[mod.LCHDocumentStorageCollectionName()]._LCHDocumentStorageList();
	},

	LCHDocumentStorageDelete (storageClient, inputData) {
		return storageClient.launchlet[mod.LCHDocumentStorageCollectionName()]._LCHDocumentStorageDelete(inputData);
	},

};

export default mod;
