import LCHDocumentStorage from './storage.js';
import { factory } from 'ulid';
const uniqueID = factory();

const mod = {

	async LCHDocumentActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		let creationDate = new Date();

		return await LCHDocumentStorage.LCHDocumentStorageWrite(storageClient, Object.assign(inputData, {
			LCHDocumentID: uniqueID(),
			LCHDocumentCreationDate: creationDate,
			LCHDocumentModificationDate: creationDate,
		}));
	},

	async LCHDocumentActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		return await LCHDocumentStorage.LCHDocumentStorageWrite(storageClient, Object.assign(inputData, {
			LCHDocumentModificationDate: new Date(),
		}));
	},

	async LCHDocumentActionDelete (storageClient, inputData) {
		return await LCHDocumentStorage.LCHDocumentStorageDelete(storageClient, inputData);
	},

	async LCHDocumentActionList (storageClient) {
		return Object.values(await LCHDocumentStorage.LCHDocumentStorageList(storageClient));
	},

};

export default mod;
