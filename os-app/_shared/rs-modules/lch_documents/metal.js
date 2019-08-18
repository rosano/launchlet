import * as LCHFormulasModel from './model.js';

export const LCHFormulasMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	let errors = LCHFormulasModel.LCHDocumentModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			LCHErrors: errors,
		});
	}

	return await storageClient.lch_documents.writeObject(inputData.LCHDocumentID, inputData);
};

export const LCHFormulasMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return LCHFormulasModel.LCHFormulasModelPostJSONParse(await storageClient.lch_documents.readObject(inputData));
};

export const LCHFormulasMetalList = async function(storageClient) {
	let outputData = await storageClient.lch_documents.listObjects();

	for (let key in outputData) {
		LCHFormulasModel.LCHFormulasModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const LCHFormulasMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return await storageClient.lch_documents.deleteObject(inputData);
};
