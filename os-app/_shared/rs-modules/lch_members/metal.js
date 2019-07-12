import * as LCHMembersModel from './model.js';

export const LCHMembersMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	let errors = LCHMembersModel.LCHMembersModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			LCHErrors: errors,
		});
	}

	return await storageClient.lch_members.writeObject(inputData.LCHMemberID, inputData);
};

export const LCHMembersMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return LCHMembersModel.LCHMembersModelPostJSONParse(await storageClient.lch_members.readObject(inputData));
};

export const LCHMembersMetalList = async function(storageClient) {
	let outputData = await storageClient.lch_members.listObjects();

	for (let key in outputData) {
		LCHMembersModel.LCHMembersModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const LCHMembersMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return await storageClient.lch_members.deleteObject(inputData);
};
