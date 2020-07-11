import * as LCHDocumentMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

const mod = {

	async LCHDocumentActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		let creationDate = new Date();

		return await LCHDocumentMetal.LCHDocumentMetalWrite(storageClient, Object.assign(inputData, {
			LCHDocumentID: uniqueID(),
			LCHDocumentCreationDate: creationDate,
			LCHDocumentModificationDate: creationDate,
		}));
	},

	async LCHDocumentActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		return await LCHDocumentMetal.LCHDocumentMetalWrite(storageClient, Object.assign(inputData, {
			LCHDocumentModificationDate: new Date(),
		}));
	},

	async LCHDocumentActionDelete (storageClient, inputData) {
		return await LCHDocumentMetal.LCHDocumentMetalDelete(storageClient, inputData);
	},

	async LCHDocumentActionList (storageClient) {
		return Object.values(await LCHDocumentMetal.LCHDocumentMetalList(storageClient));
	},

};

export default mod;
