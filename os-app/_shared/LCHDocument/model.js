import LCHFormula from '../LCHFormula/main.js';

const mod = {

	LCHDocumentModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		var errors = LCHFormula.LCHFormulaTo(LCHFormula.LCHFormulaModelErrorsFor(LCHFormula.LCHFormulaFrom(inputData)) || {}, 'LCHDocument');

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
	},

};

export default mod;