const mod = {

	LCHFormulaSafeStringFields: [
		'LCHFormulaID',
		'LCHFormulaName',
		'LCHFormulaSignature',
		'LCHFormulaInputTypes',
		'LCHFormulaOutputType',
		'LCHFormulaStyle',
		'LCHFormulaURLFilter',
		'LCHFormulaCreationDate',
		'LCHFormulaModificationDate',
		'LCHFormulaSyntaxErrorMessage',
		'@context',
	],

	LCHFormulaErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		const errors = {};

		if (inputData.LCHFormulaName !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaName !== 'string') {
				errors.LCHFormulaName = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHFormulaSignature !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaSignature !== 'string') {
				errors.LCHFormulaSignature = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHFormulaInputTypes !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaInputTypes !== 'string') {
				errors.LCHFormulaInputTypes = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHFormulaOutputType !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaOutputType !== 'string') {
				errors.LCHFormulaOutputType = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHFormulaIsHidden !== undefined) {
			if (typeof inputData.LCHFormulaIsHidden !== 'function') {
				errors.LCHFormulaIsHidden = [
					'LCHErrorNotFunction',
				];
			}
		}

		if (inputData.LCHFormulaURLFilter !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaURLFilter !== 'string') {
				errors.LCHFormulaURLFilter = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHFormulaIsAutomatic !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaIsAutomatic !== 'boolean') {
				errors.LCHFormulaIsAutomatic = [
					'LCHErrorNotBoolean',
				];
			}
		}

		if (inputData.LCHFormulaStyle !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaStyle !== 'string') {
				errors.LCHFormulaStyle = [
					'LCHErrorNotString',
				];
			}
		}

		if (inputData.LCHFormulaIsFlagged !== undefined || options.LCHOptionValidateIfNotPresent) {
			if (typeof inputData.LCHFormulaIsFlagged !== 'boolean') {
				errors.LCHFormulaIsFlagged = [
					'LCHErrorNotBoolean',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	LCHFormulaFrom (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		return Object.entries(inputData).reduce(function (coll, item) {
			coll[item[0].replace(/LCH[A-Z][a-z]+/, 'LCHFormula')] = item[1];

			return coll;
		}, {});
	},

	LCHFormulaTo (param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return Object.entries(param1).reduce(function (coll, item) {
			coll[item[0].replace('LCHFormula', param2)] = item[1];

			return coll;
		}, {});
	},

	LCHFormulaToEvaluate (inputData) {
		if (mod.LCHFormulaErrors(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		let outputData = Object.fromEntries(Object.entries(inputData).filter(function (e) {
			return !mod.LCHFormulaSafeStringFields.includes(e[0]);
		}));

		if (outputData.LCHFormulaCallbackArgs || outputData.LCHFormulaCallbackBody) {
			outputData.LCHFormulaCallbackRaw = `(function (${ outputData.LCHFormulaCallbackArgs || '' }) { ${ outputData.LCHFormulaCallbackBody || '' } })`;
			delete outputData.LCHFormulaCallbackArgs;
			delete outputData.LCHFormulaCallbackBody;
		}

		if (outputData.LCHFormulaCanonicalExampleCallbackBody) {
			outputData.LCHFormulaCanonicalExampleCallbackRaw = `(function () { ${ outputData.LCHFormulaCanonicalExampleCallbackBody || '' } })`;
			delete outputData.LCHFormulaCanonicalExampleCallbackBody;
		}

		return outputData;
	},

};

export default mod;
