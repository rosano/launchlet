import LCHDocumentModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	async LCHDocumentMetalWrite (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		let errors = LCHDocumentModel.LCHDocumentModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				LCHErrors: errors,
			});
		}

		return await storageClient.launchlet.lch_documents.LCHStorageWrite(inputData.LCHDocumentID, inputData);
	},

	async LCHDocumentMetalList (storageClient) {
		let outputData = await storageClient.launchlet.lch_documents.LCHStorageList();

		for (let key in outputData) {
			OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async LCHDocumentMetalDelete (storageClient, inputData) {
		if (typeof inputData !== 'string') {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		return await storageClient.launchlet.lch_documents.LCHStorageDelete(inputData);
	},

};

export default mod;
