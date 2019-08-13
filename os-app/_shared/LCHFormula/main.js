export const LCHFormulaModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = {};

	if (inputData.LCHFormulaTitle !== undefined) {
		if (typeof inputData.LCHFormulaTitle !== 'string') {
			errors.LCHFormulaTitle = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHFormulaSignature !== undefined) {
		if (typeof inputData.LCHFormulaSignature !== 'string') {
			errors.LCHFormulaSignature = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHFormulaInputTypes !== undefined) {
		if (typeof inputData.LCHFormulaInputTypes !== 'string') {
			errors.LCHFormulaInputTypes = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHFormulaOutputType !== undefined) {
		if (typeof inputData.LCHFormulaOutputType !== 'string') {
			errors.LCHFormulaOutputType = [
				'LCHErrorNotString',
			];
		}
	}

	if (inputData.LCHFormulaURLFilter !== undefined) {
		if (typeof inputData.LCHFormulaURLFilter !== 'string') {
			errors.LCHFormulaURLFilter = [
				'LCHErrorNotString',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};