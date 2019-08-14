import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../_shared/LCHFormula/main.js';

export const LCHRecipesModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = LCHFormulaTo(LCHFormulaModelErrorsFor(LCHFormulaFrom(inputData)) || {}, 'LCHRecipe');

	if (typeof inputData.LCHRecipeCallback !== 'function') {
		errors.LCHRecipeCallback = [
			'LCHErrorNotFunction',
		];
	}

	if (inputData.LCHRecipeName !== undefined) {
		if (typeof inputData.LCHRecipeName === 'string' && !inputData.LCHRecipeName) {
			errors.LCHRecipeName = [
				'LCHErrorNotFilled',
			];
		}

		if (typeof inputData.LCHRecipeName === 'string' && inputData.LCHRecipeName.trim() !== inputData.LCHRecipeName) {
			errors.LCHRecipeName = [
				'LCHErrorNotTrimmed',
			];
		}
	}

	if (inputData.LCHRecipeInputTypes !== undefined && typeof inputData.LCHRecipeInputTypes === 'string') {
		if (inputData.LCHRecipeInputTypes.trim() !== inputData.LCHRecipeInputTypes) {
			errors.LCHRecipeInputTypes = [
				'LCHErrorNotTrimmed',
			];
		}

		if (inputData.LCHRecipeInputTypes.trim() === '') {
			errors.LCHRecipeInputTypes = [
				'LCHErrorNotFilled',
			];
		}
	}

	if (inputData.LCHRecipeOutputType !== undefined && typeof inputData.LCHRecipeOutputType === 'string') {
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

	return Object.entries(errors).length ? errors : null;
};

export const LCHRecipesModelIsCommand = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeCallback.length) {
		return false;
	}

	return true;
};

export const LCHRecipesModelIsSubject = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeCallback.length) {
		return false;
	}

	// if (!inputData.LCHRecipeOutputType) {
	// 	return false;
	// }

	return true;
};

export const LCHRecipesModelIsAction = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!inputData.LCHRecipeName) {
		return false;
	}

	if (!inputData.LCHRecipeInputTypes) {
		return false;
	}
	
	if (!inputData.LCHRecipeCallback.length) {
		return false;
	}

	return true;
};

export const LCHRecipesModelIsType = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}
	
	if (inputData.LCHRecipeCallback.length !== 1) {
		return false;
	}

	if (inputData.LCHRecipeOutputType !== 'Bool') {
		return false;
	}

	return true;
};

export const LCHRecipesModelIsTask = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}
	
	if (inputData.LCHRecipeCallback.length) {
		return false;
	}

	if (!inputData.LCHRecipeURLFilter) {
		return false;
	}

	if (inputData.LCHRecipeIsAutomatic !== true) {
		return false;
	}

	return true;
};

export const LCHRecipesModelActionTakesObject = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!LCHRecipesModelIsAction(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}
	
	if (LCHRecipeInputTypesForString(inputData.LCHRecipeInputTypes).length < 2) {
		return false;
	}
	
	if (inputData.LCHRecipeCallback.length < 2) {
		return false;
	}

	return true;
};

export const LCHRecipesModelActionTakesParams = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!LCHRecipesModelIsAction(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}
	
	if (LCHRecipeInputTypesForString(inputData.LCHRecipeInputTypes).pop() !== 'Object') {
		return false;
	}
	
	if (inputData.LCHRecipeCallback.length !== LCHRecipeInputTypesForString(inputData.LCHRecipeInputTypes).length) {
		return false;
	}

	return true;
};

export const LCHRecipeInputTypesForString = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return inputData.split(',').map(function (e) {
		return e.trim();
	}).filter(function (e) {
		return !!e;
	});
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

		if (!LCHRecipesModelIsType(e)) {
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

export const LCHAPIActionsForType = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!Array.isArray(param2)) {
		throw new Error('LCHErrorInputInvalid');
	}

	return param2.filter(function (e) {
		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		}

		if (!LCHRecipesModelIsAction(e)) {
			return false;
		}

		if (LCHRecipeInputTypesForString(e.LCHRecipeInputTypes).shift() !== param1) {
			return false;
		}

		return true;
	});
};

export const LCHAPISubjectsForType = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!Array.isArray(param2)) {
		throw new Error('LCHErrorInputInvalid');
	}

	return param2.filter(function (e) {
		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		}

		if (!LCHRecipesModelIsSubject(e)) {
			return false;
		}

		if (e.LCHRecipeOutputType !== param1) {
			return false;
		}

		return true;
	});
};

Array.prototype._LCHIntersect = function() {
	return this.map(function (e) {
		return new Set(e);
	}).reduce(function (a, b) {
		return a.filter(i => b.has(i));
	}, [...new Set([].concat.apply([], this))]);
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

export const LCHCompositionModelErrors = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = {};

	if (!LCHRecipesModelIsAction(inputData.LCHCompositionAction)) {
		errors.LCHCompositionAction = [
			'LCHErrorInputInvalid',
		];
	}

	if (!LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectPrimary)) {
		errors.LCHCompositionSubjectPrimary = [
			'LCHErrorInputInvalid',
		];
	}

	if (inputData.LCHCompositionSubjectSecondary !== undefined) {
		if (!LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectSecondary)) {
			errors.LCHCompositionSubjectSecondary = [
				'LCHErrorInputInvalid',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHAPIExecuteComposition = async function(inputData, api = {}) {
	if (LCHCompositionModelErrors(inputData)) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	if (typeof api.fn !== 'function') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	return LCHAPIExecuteRecipe(inputData.LCHCompositionAction, [
		await LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectPrimary, [], api),
		].concat(inputData.LCHCompositionSubjectSecondary ? [
			await LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectSecondary, [], api),
			] : []), api);
};

export const LCHAPIExecuteRecipe = async function(param1, param2 = [], param3 = {}) {
	if (LCHRecipesModelErrorsFor(param1)) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	if (!Array.isArray(param2)) {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	if (typeof param3.fn !== 'function') {
		return Promise.reject(new Error('LCHErrorInputInvalid'));
	}

	if (param3._LCHAPIExecuteRecipePrior) {
		param3._LCHAPIExecuteRecipePrior();
		delete param3._LCHAPIExecuteRecipePrior;
	};

	return Promise.resolve(param1.LCHRecipeCallback.apply({
		api: param3,
	}, param2));
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
