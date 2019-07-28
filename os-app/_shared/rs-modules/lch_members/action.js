import * as LCHFormulasModel from './model.js';
import * as LCHFormulasMetal from './metal.js';
import * as ULIDPackage from 'ulid';

export const LCHFormulasActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	let creationDate = new Date();

	return await LCHFormulasMetal.LCHFormulasMetalWrite(storageClient, Object.assign(inputData, {
		LCHMemberID: ULIDPackage.ulid(),
		LCHMemberCreationDate: creationDate,
		LCHMemberModificationDate: creationDate,
	}));
};

export const LCHFormulasActionRead = async function(storageClient, inputData) {
	return await LCHFormulasMetal.LCHFormulasMetalRead(storageClient, inputData);
};

export const LCHFormulasActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return await LCHFormulasMetal.LCHFormulasMetalWrite(storageClient, Object.assign(inputData, {
		LCHMemberModificationDate: new Date(),
	}));
};

export const LCHFormulasActionDelete = async function(storageClient, inputData) {
	return await LCHFormulasMetal.LCHFormulasMetalDelete(storageClient, inputData);
};

export const LCHFormulasActionList = async function(storageClient) {
	return Object.values(await LCHFormulasMetal.LCHFormulasMetalList(storageClient));
};
