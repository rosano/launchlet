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

		if (typeof inputData.LCHRecipeTitle === 'string' && !inputData.LCHRecipeTitle) {
			errors.LCHRecipeTitle = [
				'LCHErrorNotFilled',
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

	if (inputData.LCHRecipeURLFilter !== undefined) {
		if (typeof inputData.LCHRecipeURLFilter !== 'string') {
			errors.LCHRecipeURLFilter = [
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

export const LCHComponentDescriptorsModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = {};

	if (typeof inputData.LCHComponentDescriptorName !== 'string') {
		errors.LCHComponentDescriptorName = [
			'LCHErrorNotString',
		];
	}

	if (typeof inputData.LCHComponentDescriptorName === 'string' && !inputData.LCHComponentDescriptorName) {
		errors.LCHComponentDescriptorName = [
			'LCHErrorNotFilled',
		];
	}

	if (typeof inputData.LCHComponentDescriptorName === 'string' && inputData.LCHComponentDescriptorName.trim() !== inputData.LCHComponentDescriptorName) {
		errors.LCHComponentDescriptorName = [
			'LCHErrorNotTrimmed',
		];
	}

	if (typeof inputData.LCHComponentDescriptorCompletionHandler !== 'string') {
		errors.LCHComponentDescriptorCompletionHandler = [
			'LCHErrorNotString',
		];
	}

	if (typeof inputData.LCHComponentDescriptorCompletionHandler === 'string' && !inputData.LCHComponentDescriptorCompletionHandler) {
		errors.LCHComponentDescriptorCompletionHandler = [
			'LCHErrorNotFilled',
		];
	}

	if (typeof inputData.LCHComponentDescriptorCompletionHandler === 'string' && inputData.LCHComponentDescriptorCompletionHandler.trim() !== inputData.LCHComponentDescriptorCompletionHandler) {
		errors.LCHComponentDescriptorCompletionHandler = [
			'LCHErrorNotTrimmed',
		];
	}

	if (inputData.LCHComponentDescriptorProps !== undefined) {
		if (typeof inputData.LCHComponentDescriptorProps !== 'object' || inputData.LCHComponentDescriptorProps === null) {
			errors.LCHComponentDescriptorProps = [
				'LCHErrorNotObject',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};


