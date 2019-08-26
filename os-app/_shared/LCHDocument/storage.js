import * as LCHDocumentModel from './model.js';

const kType = 'lch_document';
const kCollection = 'lch_documents';

export const LCHDocumentStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

export const LCHDocumentStorage = function (privateClient, publicClient, changeDelegate) {
	privateClient.on('change', function (event) {
		if (!changeDelegate) {
			return;
		};
		
		if (event.relativePath.indexOf(kCollection) !== 0) {
			return;
		};

		if (typeof event.oldValue === 'undefined') {
			return typeof changeDelegate.OLSKChangeDelegateAdd === 'function' ? changeDelegate.OLSKChangeDelegateAdd(LCHDocumentModel.LCHDocumentModelPostJSONParse(event.newValue)) : console.warn('OLSKChangeDelegateAdd not function');
		}

		if (typeof event.newValue === 'undefined') {
			return typeof changeDelegate.OLSKChangeDelegateRemove === 'function' ? changeDelegate.OLSKChangeDelegateRemove(event.oldValue) : console.warn('OLSKChangeDelegateRemove not function');
		}

		if (JSON.stringify(event.oldValue) !== JSON.stringify(event.newValue)) {
			return typeof changeDelegate.OLSKChangeDelegateUpdate === 'function' ? changeDelegate.OLSKChangeDelegateUpdate(LCHDocumentModel.LCHDocumentModelPostJSONParse(event.newValue)) : console.warn('OLSKChangeDelegateUpdate not function');
		}

		console.info(event);
	});

	return {
		LCHStorageCollection: kCollection,
		LCHStorageType: kType,
		LCHStorageModelErrors: LCHDocumentModel.LCHDocumentModelErrorsFor({}),
		LCHStorageExports: {
			init: function () {
				return privateClient.cache(LCHDocumentStoragePath());
			},
			listObjects: function () {
				return privateClient.getAll(LCHDocumentStoragePath());
			},
			writeObject: async function (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, LCHDocumentModel.LCHDocumentModelPreJSONSchemaValidate(param2));
				return LCHDocumentModel.LCHDocumentModelPostJSONParse(param2);
			},
			readObject: function (inputData) {
				return privateClient.getObject(`${ kCollection }/${ inputData }`);
			},
			deleteObject: function (inputData) {
				return privateClient.remove(`${ kCollection }/${ inputData }`);
			},
		},
	};
};
