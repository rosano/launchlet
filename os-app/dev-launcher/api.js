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

	if (inputData.LCHRecipeTitle !== undefined) {
		if (typeof inputData.LCHRecipeTitle !== 'string') {
			errors.LCHRecipeTitle = [
				'LCHErrorNotString',
			];
		}

		if (typeof inputData.LCHRecipeTitle === 'string' && inputData.LCHRecipeTitle.trim() !== inputData.LCHRecipeTitle) {
			errors.LCHRecipeTitle = [
				'LCHErrorNotTrimmed',
			];
		}
	}

	if (inputData.LCHRecipeSignature !== undefined) {
		if (typeof inputData.LCHRecipeSignature !== 'string') {
			errors.LCHRecipeSignature = [
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
				return e.LCHRecipeSignature === signature;
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
