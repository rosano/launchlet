export const LCHFormulaModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = {};

	if (inputData.LCHFormulaName !== undefined) {
		if (typeof inputData.LCHFormulaName !== 'string') {
			errors.LCHFormulaName = [
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

	if (inputData.LCHFormulaIsAutomatic !== undefined) {
		if (typeof inputData.LCHFormulaIsAutomatic !== 'boolean') {
			errors.LCHFormulaIsAutomatic = [
				'LCHErrorNotBoolean',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHFormulaFrom = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.entries(inputData).reduce(function (coll, item) {
		coll[item[0].replace(/LCH[A-Z][a-z]+/, 'LCHFormula')] = item[1];

		return coll;
	}, {});
};

export const LCHFormulaTo = function(param1, param2) {
	if (typeof param1 !== 'object' || param1 === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.entries(param1).reduce(function (coll, item) {
		coll[item[0].replace('LCHFormula', param2)] = item[1];

		return coll;
	}, {});
};
