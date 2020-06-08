import * as LCHDocumentModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const kType = 'lch_document';
const kCollection = 'lch_documents';

export const LCHDocumentStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

export const LCHDocumentStorage = function (privateClient, publicClient, changeDelegate) {
	privateClient.on('change', function (event) {
		if (!changeDelegate) {
			return;
		}
		
		if (event.relativePath.indexOf(kCollection) !== 0) {
			return;
		}

		const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

		if (!delegateMethod) {
			return;
		}

		if (typeof changeDelegate[delegateMethod] !== 'function') {
			return console.warn(`${ delegateMethod } not function`);
		}

		changeDelegate[delegateMethod](LCHDocumentModel.LCHDocumentModelPostJSONParse(event[OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateInput(delegateMethod)]));
	});

	return {
		LCHStorageCollection: kCollection,
		LCHStorageType: kType,
		LCHStorageModelErrors: Object.entries(LCHDocumentModel.LCHDocumentModelErrorsFor({}, {
			LCHOptionValidateIfNotPresent: true,
		})).map(function (e) {
			if (Object.keys(LCHDocumentModel.LCHDocumentModelErrorsFor({})).indexOf(e[0]) === -1) {
				e[1].push('__RSOptional');
			}

			return e;
		}).reduce(function (coll, item) {
			coll[item[0]] = item[1];

			return coll;
		}, {}),
		LCHStorageExports: {
			LCHStorageList () {
				return privateClient.getAll(LCHDocumentStoragePath(), false);
			},
			async LCHStorageWrite (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, LCHDocumentModel.LCHDocumentModelPreJSONSchemaValidate(param2));
				return LCHDocumentModel.LCHDocumentModelPostJSONParse(param2);
			},
			LCHStorageRead (inputData) {
				return privateClient.getObject(`${ kCollection }/${ inputData }`);
			},
			LCHStorageDelete (inputData) {
				return privateClient.remove(`${ kCollection }/${ inputData }`);
			},
		},
	};
};
