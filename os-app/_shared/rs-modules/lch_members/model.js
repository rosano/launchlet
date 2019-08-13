import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../../LCHFormula/main.js';

export const LCHFormulasModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	var errors = LCHFormulaTo(LCHFormulaModelErrorsFor(LCHFormulaFrom(inputData)) || {}, 'LCHMember');

	if (typeof inputData.LCHMemberID !== 'string') {
		errors.LCHMemberID = [
			'LCHErrorNotString',
		];
	} else if (inputData.LCHMemberID.trim() === '') {
		errors.LCHMemberID = [
			'LCHErrorNotFilled',
		];
	}

	if (typeof inputData.LCHMemberBody !== 'string') {
		errors.LCHMemberBody = [
			'LCHErrorNotString',
		];
	}

	if (!(inputData.LCHMemberCreationDate instanceof Date) || Number.isNaN(inputData.LCHMemberCreationDate.getTime())) {
		errors.LCHMemberCreationDate = [
			'LCHErrorNotDate',
		];
	}

	if (!(inputData.LCHMemberModificationDate instanceof Date) || Number.isNaN(inputData.LCHMemberModificationDate.getTime())) {
		errors.LCHMemberModificationDate = [
			'LCHErrorNotDate',
		];
	}

	if (inputData.LCHMemberArgs !== undefined) {
		if (typeof inputData.LCHMemberArgs !== 'string') {
			errors.LCHMemberArgs = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHMemberOutputType !== undefined && typeof inputData.LCHMemberOutputType === 'string') {
		if (inputData.LCHMemberOutputType.trim() !== inputData.LCHMemberOutputType) {
			errors.LCHMemberOutputType = [
				'LCHErrorNotTrimmed',
			];
		}

		if (inputData.LCHMemberOutputType.trim() === '') {
			errors.LCHMemberOutputType = [
				'LCHErrorNotFilled',
			];
		}
	}

	if (inputData.LCHMemberOutputTypeCanonicalExampleBody !== undefined) {
		if (typeof inputData.LCHMemberOutputTypeCanonicalExampleBody !== 'string') {
			errors.LCHMemberOutputTypeCanonicalExampleBody = [
				'LCHErrorNotString',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHFormulasModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.LCHMemberCreationDate) {
		inputData.LCHMemberCreationDate = inputData.LCHMemberCreationDate.toISOString();
	}

	if (inputData.LCHMemberModificationDate) {
		inputData.LCHMemberModificationDate = inputData.LCHMemberModificationDate.toISOString();
	}

	return inputData;
};

export const LCHFormulasModelPostJSONParse = function(inputData) {
	if (!inputData) {
		return inputData;
	}

	if (inputData.LCHMemberCreationDate) {
		inputData.LCHMemberCreationDate = new Date(inputData.LCHMemberCreationDate);
	}

	if (inputData.LCHMemberModificationDate) {
		inputData.LCHMemberModificationDate = new Date(inputData.LCHMemberModificationDate);
	}

	return inputData;
};
