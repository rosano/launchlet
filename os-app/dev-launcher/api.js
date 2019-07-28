export const LCHRecipesModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = {};

	if (typeof inputData.LCHRecipeCallback !== 'function') {
		errors.LCHRecipeCallback = [
			'LCHErrorNotFunction',
		];
	}

	if (inputData.LCHRecipeName !== undefined) {
		if (typeof inputData.LCHRecipeName !== 'string') {
			errors.LCHRecipeName = [
				'LCHErrorNotString',
			];
		}

		if (typeof inputData.LCHRecipeName === 'string' && inputData.LCHRecipeName.trim() !== inputData.LCHRecipeName) {
			errors.LCHRecipeName = [
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

export const LCHAPIObjectFor = function(inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	const api = {
		fn (signature) {
			if (typeof signature !== 'string') {
				throw new Error('LCHErrorIdentifierNotString');
			}

			if (signature === '') {
				throw new Error('LCHErrorIdentifierBlank');
			}

			if (signature.trim() !== signature) {
				throw new Error('LCHErrorIdentifierContainsUntrimmedWhitespace');
			}

			let functionObject = inputData.filter(function (e) {
				return e.signature === signature;
			}).shift();

			if (!functionObject) {
				throw new Error('LCHErrorIdentifierNotDefined');
			}

			return functionObject.LCHRecipeCallback.bind({
				api: api,
			});
		},
	};

	return api;
};
