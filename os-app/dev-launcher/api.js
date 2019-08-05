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

	if (inputData.LCHRecipeOutputType !== undefined) {
		if (typeof inputData.LCHRecipeOutputType !== 'string') {
			errors.LCHRecipeOutputType = [
				'LCHErrorNotString',
			];
		} else {
			if (inputData.LCHRecipeOutputType.trim() !== inputData.LCHRecipeOutputType) {
				errors.LCHRecipeOutputType = [
					'LCHErrorNotTrimmed',
				];
			}

			if (inputData.LCHRecipeOutputType.trim() === '') {
				errors.LCHRecipeOutputType = [
					'LCHErrorNotFilled',
				];
			}
		}
	}

	if (inputData.LCHRecipeOutputType === 'Bool') {
		if (!inputData.LCHRecipeOutputTypeCanonicalExampleCallback) {
			errors.LCHRecipeOutputTypeCanonicalExampleCallback = [
				'LCHErrorNotPresent',
			];
		}

		if (!inputData.LCHRecipeSignature) {
			errors.LCHRecipeSignature = [
				'LCHErrorNotPresent',
			];
		}
	}

	if (inputData.LCHRecipeOutputTypeCanonicalExampleCallback !== undefined) {
		if (typeof inputData.LCHRecipeOutputTypeCanonicalExampleCallback !== 'function') {
			errors.LCHRecipeOutputTypeCanonicalExampleCallback = [
				'LCHErrorNotFunction',
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

export const LCHRecipesModelIsCommand = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!inputData.LCHRecipeTitle) {
		return false;
	}

	return true;
};

export const LCHRecipesModelIsSubject = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!inputData.LCHRecipeTitle) {
		return false;
	}

	if (!inputData.LCHRecipeOutputType) {
		return false;
	}

	return true;
};

export const LCHAPITypeEquivalenceMapForRecipes = function(inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	const uniqueSignatures = [];
	const validRecipes = inputData.filter(function (e) {
		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		}

		if (e.LCHRecipeOutputType !== 'Bool') {
			return false;
		}

		if (!e.LCHRecipeCallback(e.LCHRecipeOutputTypeCanonicalExampleCallback())) {
			return false;
		}

		if (uniqueSignatures.indexOf(e.LCHRecipeSignature) !== -1) {
			return false;
		}

		uniqueSignatures.push(e.LCHRecipeSignature);

		return true;
	});

	return validRecipes.reduce(function (coll, item) {
		coll[item.LCHRecipeSignature] = validRecipes.filter(function (e) {
			return item.LCHRecipeCallback(e.LCHRecipeOutputTypeCanonicalExampleCallback());
		}).map(function (e) {
			return e.LCHRecipeSignature;
		});

		return coll;
	}, {});
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
