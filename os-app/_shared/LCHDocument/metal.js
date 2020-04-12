import { LCHDocumentModelErrorsFor, LCHDocumentModelPostJSONParse } from './model.js';

export const LCHDocumentMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	let errors = LCHDocumentModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			LCHErrors: errors,
		});
	}

	return await storageClient.launchlet.lch_documents.LCHStorageWrite(inputData.LCHDocumentID, inputData);
};

export const LCHDocumentMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	return LCHDocumentModelPostJSONParse(await storageClient.launchlet.lch_documents.LCHStorageRead(inputData));
};

export const LCHDocumentMetalList = async function(storageClient) {
	let outputData = await storageClient.launchlet.lch_documents.LCHStorageList();

	for (let key in outputData) {
		LCHDocumentModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const LCHDocumentMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	return await storageClient.launchlet.lch_documents.LCHStorageDelete(inputData);
};
