import * as LCHFormulasMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

export const LCHFormulasActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	let creationDate = new Date();

	return await LCHFormulasMetal.LCHFormulasMetalWrite(storageClient, Object.assign(inputData, {
		LCHDocumentID: uniqueID(),
		LCHDocumentCreationDate: creationDate,
		LCHDocumentModificationDate: creationDate,
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
		LCHDocumentModificationDate: new Date(),
	}));
};

export const LCHFormulasActionDelete = async function(storageClient, inputData) {
	return await LCHFormulasMetal.LCHFormulasMetalDelete(storageClient, inputData);
};

export const LCHFormulasActionList = async function(storageClient) {
	return Object.values(await LCHFormulasMetal.LCHFormulasMetalList(storageClient));
};
