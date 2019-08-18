import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../../LCHFormula/main.js';

export const LCHDocumentModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
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

	if (typeof inputData.LCHDocumentBody !== 'string') {
		errors.LCHDocumentBody = [
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

	if (inputData.LCHDocumentArgs !== undefined) {
		if (typeof inputData.LCHDocumentArgs !== 'string') {
			errors.LCHDocumentArgs = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHDocumentOutputType !== undefined && typeof inputData.LCHDocumentOutputType === 'string') {
		if (inputData.LCHDocumentOutputType.trim() !== inputData.LCHDocumentOutputType) {
			errors.LCHDocumentOutputType = [
				'LCHErrorNotTrimmed',
			];
		}

		if (inputData.LCHDocumentOutputType.trim() === '') {
			errors.LCHDocumentOutputType = [
				'LCHErrorNotFilled',
			];
		}
	}

	if (inputData.LCHDocumentOutputTypeCanonicalExampleBody !== undefined) {
		if (typeof inputData.LCHDocumentOutputTypeCanonicalExampleBody !== 'string') {
			errors.LCHDocumentOutputTypeCanonicalExampleBody = [
				'LCHErrorNotString',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHFormulasModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.LCHDocumentCreationDate) {
		inputData.LCHDocumentCreationDate = inputData.LCHDocumentCreationDate.toISOString();
	}

	if (inputData.LCHDocumentModificationDate) {
		inputData.LCHDocumentModificationDate = inputData.LCHDocumentModificationDate.toISOString();
	}

	return inputData;
};

export const LCHFormulasModelPostJSONParse = function(inputData) {
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
