export const LCHRecipesModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = {};

	if (typeof inputData.callback !== 'function') {
		errors.callback = [
			'LCHErrorNotFunction',
		];
	}

	if (inputData.name !== undefined) {
		if (typeof inputData.name !== 'string') {
			errors.name = [
				'LCHErrorNotString',
			];
		}

		if (typeof inputData.name === 'string' && inputData.name.trim() !== inputData.name) {
			errors.name = [
				'LCHErrorNotTrimmed',
			];
		}
	}

	if (inputData.signature !== undefined) {
		if (typeof inputData.signature !== 'string') {
			errors.signature = [
				'LCHErrorNotString',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

