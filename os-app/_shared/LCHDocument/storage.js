import LCHDocumentModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const kCollection = 'lch_documents';

const mod = {

	LCHDocumentStorageCollectionType () {
		return 'lch_document';
	},

	LCHDocumentStorageCollectionPath () {
		return kCollection + '/';
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

			async LCHStorageList () {
				return privateClient.getAll(mod.LCHDocumentStorageCollectionPath(), false);
			},

			async LCHStorageWrite (inputData) {
				await privateClient.storeObject(mod.LCHDocumentStorageCollectionType(), mod.LCHDocumentStorageObjectPath(inputData), OLSKRemoteStorage.OLSKRemoteStoragePreJSONSchemaValidate(inputData));
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData);
			},
			
			async LCHStorageDelete (inputData) {
				return privateClient.remove(mod.LCHDocumentStorageCollectionPath() + inputData);
			},

		};

		return {
			OLSKRemoteStorageCollectionName: kCollection,
			OLSKRemoteStorageCollectionType: mod.LCHDocumentStorageCollectionType(),
			OLSKRemoteStorageCollectionModelErrors: Object.entries(LCHDocumentModel.LCHDocumentModelErrorsFor({}, {
				LCHOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (!Object.keys(LCHDocumentModel.LCHDocumentModelErrorsFor({})).includes(e[0])) {
					e[1].push('__RSOptional');
				}

				return e;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {}),
			OLSKRemoteStorageCollectionExports,
		};
	},

};

export default mod;
