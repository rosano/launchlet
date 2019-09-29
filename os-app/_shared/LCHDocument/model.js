import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../LCHFormula/main.js';

export const LCHDocumentModelErrorsFor = function(inputData, options = {}) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	var errors = LCHFormulaTo(LCHFormulaModelErrorsFor(LCHFormulaFrom(inputData)) || {}, 'LCHDocument');

	if (typeof inputData.LCHDocumentID !== 'string') {
		errors.LCHDocumentID = [
			'LCHErrorNotString',
		];
	} else if (inputData.LCHDocumentID.trim() === '') {
		errors.LCHDocumentID = [
			'LCHErrorNotFilled',
		];
	}

	if (typeof inputData.LCHDocumentCallbackBody !== 'string') {
		errors.LCHDocumentCallbackBody = [
			'LCHErrorNotString',
		];
	}

	if (!(inputData.LCHDocumentCreationDate instanceof Date) || Number.isNaN(inputData.LCHDocumentCreationDate.getTime())) {
		errors.LCHDocumentCreationDate = [
			'LCHErrorNotDate',
		];
	}

	if (!(inputData.LCHDocumentModificationDate instanceof Date) || Number.isNaN(inputData.LCHDocumentModificationDate.getTime())) {
		errors.LCHDocumentModificationDate = [
			'LCHErrorNotDate',
		];
	}

	if (inputData.LCHDocumentCallbackArgs !== undefined || options.LCHOptionValidateIfNotPresent) {
		if (typeof inputData.LCHDocumentCallbackArgs !== 'string') {
			errors.LCHDocumentCallbackArgs = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHDocumentSyntaxErrorMessage !== undefined || options.LCHOptionValidateIfNotPresent) {
		if (typeof inputData.LCHDocumentSyntaxErrorMessage !== 'string') {
			errors.LCHDocumentSyntaxErrorMessage = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHDocumentCanonicalExampleCallbackBody !== undefined || options.LCHOptionValidateIfNotPresent) {
		if (typeof inputData.LCHDocumentCanonicalExampleCallbackBody !== 'string') {
			errors.LCHDocumentCanonicalExampleCallbackBody = [
				'LCHErrorNotString',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHDocumentModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.LCHDocumentCreationDate) {
		inputData.LCHDocumentCreationDate = inputData.LCHDocumentCreationDate.toISOString();
	}

	if (inputData.LCHDocumentModificationDate) {
		inputData.LCHDocumentModificationDate = inputData.LCHDocumentModificationDate.toISOString();
	}

	return inputData;
};

export const LCHDocumentModelPostJSONParse = function(inputData) {
	if (!inputData) {
		return inputData;
	}

	if (inputData.LCHDocumentCreationDate) {
		inputData.LCHDocumentCreationDate = new Date(inputData.LCHDocumentCreationDate);
	}

	if (inputData.LCHDocumentModificationDate) {
		inputData.LCHDocumentModificationDate = new Date(inputData.LCHDocumentModificationDate);
	}

	return inputData;
};
