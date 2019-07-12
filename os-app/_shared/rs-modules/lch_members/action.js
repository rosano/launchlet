import * as LCHMembersModel from './model.js';
import * as LCHMembersMetal from './metal.js';
import * as ULIDPackage from 'ulid';

export const LCHMembersActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	let creationDate = new Date();

	return await LCHMembersMetal.LCHMembersMetalWrite(storageClient, Object.assign(inputData, {
		LCHMemberID: ULIDPackage.ulid(),
		LCHMemberCreationDate: creationDate,
		LCHMemberModificationDate: creationDate,
	}));
};

export const LCHMembersActionRead = async function(storageClient, inputData) {
	return await LCHMembersMetal.LCHMembersMetalRead(storageClient, inputData);
};

export const LCHMembersActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return await LCHMembersMetal.LCHMembersMetalWrite(storageClient, Object.assign(inputData, {
		LCHMemberModificationDate: new Date(),
	}));
};

export const LCHMembersActionDelete = async function(storageClient, inputData) {
	return await LCHMembersMetal.LCHMembersMetalDelete(storageClient, inputData);
};
