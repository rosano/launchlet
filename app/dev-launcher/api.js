import { LCHFormulaModelErrorsFor, LCHFormulaFrom, LCHFormulaTo } from '../_shared/LCHFormula/main.js';

export const LCHRecipesModelErrorsFor = function(inputData, options = {}) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	const errors = LCHFormulaTo(LCHFormulaModelErrorsFor(LCHFormulaFrom(inputData)) || {}, 'LCHRecipe');

	if (typeof inputData.LCHRecipeCallback !== 'function') {
		errors.LCHRecipeCallback = [
			'LCHErrorNotFunction',
		];
	}

	if (typeof inputData.LCHRecipeName === 'string') {
		if (!inputData.LCHRecipeName.trim()) {
			errors.LCHRecipeName = [
				'LCHErrorNotFilled',
			];
		}
	}

	if (typeof inputData.LCHRecipeInputTypes === 'string') {
		if (inputData.LCHRecipeInputTypes.trim() !== inputData.LCHRecipeInputTypes) {
			errors.LCHRecipeInputTypes = [
				'LCHErrorNotTrimmed',
			];
		}

		if (!inputData.LCHRecipeInputTypes.trim()) {
			errors.LCHRecipeInputTypes = [
				'LCHErrorNotFilled',
			];
		}
	}

	if (typeof inputData.LCHRecipeOutputType === 'string') {
		if (inputData.LCHRecipeOutputType.trim() !== inputData.LCHRecipeOutputType) {
			errors.LCHRecipeOutputType = [
				'LCHErrorNotTrimmed',
			];
		}

		if (!inputData.LCHRecipeOutputType.trim()) {
			errors.LCHRecipeOutputType = [
				'LCHErrorNotFilled',
			];
		}
	}

	if (inputData.LCHRecipeCanonicalExampleCallback !== undefined || options.LCHOptionValidateIfNotPresent) {
		if (typeof inputData.LCHRecipeCanonicalExampleCallback !== 'function') {
			errors.LCHRecipeCanonicalExampleCallback = [
				'LCHErrorNotFunction',
			];
		}
	}

	if (typeof inputData.LCHRecipeSignature === 'string') {
		if (!inputData.LCHRecipeSignature.trim()) {
			errors.LCHRecipeSignature = [
				'LCHErrorNotFilled',
			];
		} else if (inputData.LCHRecipeSignature.trim() !== inputData.LCHRecipeSignature) {
			errors.LCHRecipeSignature = [
				'LCHErrorNotTrimmed',
			];
		};
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHRecipesModelIsCommand = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeInputTypes) {
		return false;
	}

	if (inputData.LCHRecipeOutputType) {
		return false;
	}

	return true;
};

export const LCHRecipesModelIsSubject = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	// if (inputData.LCHRecipeInputTypes) {
	// 	return false;
	// }

	if (!inputData.LCHRecipeOutputType) {
		return false;
	}

	return true;
};

export const LCHRecipesModelIsAction = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!inputData.LCHRecipeName) {
		return false;
	}

	if (!inputData.LCHRecipeInputTypes) {
		return false;
	}
	
	// if (!inputData.LCHRecipeCallback.length) {
	// 	return false;
	// }

	return true;
};

export const LCHRecipesModelIsType = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}
	
	// if (inputData.LCHRecipeCallback.length !== 1) {
	// 	return false;
	// }

	if (inputData.LCHRecipeOutputType !== 'Bool') {
		return false;
	}

	if (!inputData.LCHRecipeCanonicalExampleCallback) {
		return false;
	}

	if (!inputData.LCHRecipeSignature) {
		return false;
	}

	return true;
};

export const LCHRecipesModelIsTask = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}
	
	// if (inputData.LCHRecipeCallback.length) {
	// 	return false;
	// }

	if (!inputData.LCHRecipeURLFilter) {
		return false;
	}

	if (inputData.LCHRecipeIsAutomatic !== true) {
		return false;
	}

	return true;
};

import { LCHTypeServiceSearchRecipe } from './recipes/types/ServiceSearch/main.js';
export const LCHLauncherConvertTypeServiceSearch = function(inputData, _stringCallback) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	return inputData.filter(function (e) {
		if (typeof e !== 'object' || e === null) {
			return false;
		}
		
		return true;
	}).map(function (e) {
		if (!LCHTypeServiceSearchRecipe().LCHRecipeCallback(e)) {
			return e;
		}

		return {
			LCHRecipeName: _stringCallback(e.LCHRecipeName),
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback (inputData) {
				return this.api.fn('LCHSearchWith')(inputData, e);
			},
			_LCHLauncherGenerated: true,
		};
	});
};

export const LCHRecipesModelActionTakesObject = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!LCHRecipesModelIsAction(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}
	
	if (LCHRecipeInputTypesForString(inputData.LCHRecipeInputTypes).length < 2) {
		return false;
	}
	
	// if (inputData.LCHRecipeCallback.length < 2) {
	// 	return false;
	// }

	return true;
};

export const LCHRecipesModelActionTakesParams = function(inputData) {
	if (LCHRecipesModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!LCHRecipesModelIsAction(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}
	
	if (LCHRecipeInputTypesForString(inputData.LCHRecipeInputTypes).pop() !== 'Object') {
		return false;
	}
	
	// if (inputData.LCHRecipeCallback.length !== LCHRecipeInputTypesForString(inputData.LCHRecipeInputTypes).length) {
	// 	return false;
	// }

	return true;
};

export const LCHRecipeInputTypesForString = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return inputData.split(',').map(function (e) {
		return e.trim();
	}).filter(function (e) {
		return !!e;
	});
};

export const LCHAPITypeEquivalenceMapForRecipes = function(inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	const uniqueSignatures = [];
	const validRecipes = inputData.filter(function (e) {
		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		}

		if (!LCHRecipesModelIsType(e)) {
			return false;
		}

		if (!e.LCHRecipeCallback(e.LCHRecipeCanonicalExampleCallback())) {
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
			if (item === e) {
				return true;
			}

			if (e._LCHRecipeTypeIsExclusive) {
				return false;
			}

			if (item._LCHRecipeTypeIsExclusive) {
				return false;
			}

			return e.LCHRecipeCallback(item.LCHRecipeCanonicalExampleCallback());
		}).map(function (e) {
			return e.LCHRecipeSignature;
		});

		return coll;
	}, {});
};

export const LCHAPITypeNameMap = function(inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	const validRecipes = inputData.filter(function (e) {
		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		}

		return LCHRecipesModelIsType(e);
	});

	return validRecipes.reduce(function (coll, item) {
		if (coll[item.LCHRecipeSignature]) {
			return coll;
		};

		coll[item.LCHRecipeSignature] = item.LCHRecipeName || item.LCHRecipeSignature;

		return coll;
	}, {});
};

export const LCHAPIActionsForType = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!Array.isArray(param2)) {
		throw new Error('LCHErrorInputNotValid');
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
		throw new Error('LCHErrorInputNotValid');
	}

	if (!Array.isArray(param2)) {
		throw new Error('LCHErrorInputNotValid');
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
		throw new Error('LCHErrorInputNotValid');
	}

	const outputData = {
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
				api: outputData,
			});
		},
	};

	Object.assign(outputData, inputData.reduce(function (coll, item) {
		if (!coll[item.LCHRecipeSignature]) {
			coll[item.LCHRecipeSignature] = function () {
				const args = arguments;

				(item.LCHRecipeInputTypes ? LCHRecipeInputTypesForString(item.LCHRecipeInputTypes) : []).forEach(function (e, i) {
					if (!coll[e](args[i])) {
						throw new Error('LCHErrorTypeMismatch')
					};
				})

				return item.LCHRecipeCallback.apply({
					api: outputData,
				}, args);
			};
		}

		return coll;
	}, {}));

	Object.freeze(outputData);

	return outputData;
};

export const LCHCompositionModelErrors = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!inputData.LCHCompositionAction) {
		return {
			LCHCompositionAction: [
				'LCHErrorInputNotPresent',
			],
		};
	}

	if (!LCHRecipesModelIsAction(inputData.LCHCompositionAction)) {
		return {
			LCHCompositionAction: [
				'LCHErrorInputNotValid',
			],
		};
	}

	const errors = {};

	if (!inputData.LCHCompositionSubjectPrimary) {
		return {
			LCHCompositionSubjectPrimary: [
				'LCHErrorInputNotPresent',
			],
		};
	} else if (inputData.LCHCompositionAction.LCHRecipeInputTypes === 'Command' && LCHRecipesModelIsCommand(inputData.LCHCompositionSubjectPrimary)) {

	}

	// if (!LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectPrimary)) {
	// 	errors.LCHCompositionSubjectPrimary = [
	// 		'LCHErrorInputNotValid',
	// 	];
	// }

	else if (inputData.LCHCompositionAction.LCHRecipeInputTypes && LCHRecipeInputTypesForString(inputData.LCHCompositionAction.LCHRecipeInputTypes).indexOf(inputData.LCHCompositionSubjectPrimary.LCHRecipeOutputType) === -1) {
		errors.LCHCompositionSubjectPrimary = [
			'LCHErrorInputNotValid',
		];
	}

	if (inputData.LCHCompositionAction.LCHRecipeInputTypes && LCHRecipeInputTypesForString(inputData.LCHCompositionAction.LCHRecipeInputTypes).length === 2 && !inputData.LCHCompositionSubjectSecondary) {
		errors.LCHCompositionSubjectSecondary = [
			'LCHErrorInputNotValid',
		];
	}

	if (inputData.LCHCompositionSubjectSecondary !== undefined) {
		if (!LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectSecondary)) {
			errors.LCHCompositionSubjectSecondary = [
				'LCHErrorInputNotValid',
			];
		}

		if (inputData.LCHCompositionAction.LCHRecipeInputTypes && LCHRecipeInputTypesForString(inputData.LCHCompositionAction.LCHRecipeInputTypes).indexOf(inputData.LCHCompositionSubjectSecondary.LCHRecipeOutputType) === -1) {
			errors.LCHCompositionSubjectSecondary = [
				'LCHErrorInputNotValid',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const LCHAPIExecuteComposition = async function(inputData, api = {}) {
	if (LCHCompositionModelErrors(inputData)) {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	if (typeof api.fn !== 'function') {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	return LCHAPIExecuteRecipe(inputData.LCHCompositionAction, [
		await LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectPrimary, [], api),
	].concat(inputData.LCHCompositionSubjectSecondary ? [
		await LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectSecondary, [], api),
	] : []), api);
};

export const LCHAPIExecuteRecipe = async function(param1, param2 = [], param3 = {}) {
	if (LCHRecipesModelErrorsFor(param1)) {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	if (!Array.isArray(param2)) {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	if (typeof param3.fn !== 'function') {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	if (param1.LCHRecipeStyle && typeof document !== 'undefined') {
		document.body.appendChild(document.createElement('style')).innerHTML = param1.LCHRecipeStyle;
	}

	return Promise.resolve(param1.LCHRecipeCallback.apply({
		api: param3,
	}, param2));
};

export const LCHComponentDescriptorsModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
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

	if (typeof inputData.LCHComponentDescriptorCompletionHandlerSignature !== 'string') {
		errors.LCHComponentDescriptorCompletionHandlerSignature = [
			'LCHErrorNotString',
		];
	}

	if (typeof inputData.LCHComponentDescriptorCompletionHandlerSignature === 'string' && !inputData.LCHComponentDescriptorCompletionHandlerSignature) {
		errors.LCHComponentDescriptorCompletionHandlerSignature = [
			'LCHErrorNotFilled',
		];
	}

	if (typeof inputData.LCHComponentDescriptorCompletionHandlerSignature === 'string' && inputData.LCHComponentDescriptorCompletionHandlerSignature.trim() !== inputData.LCHComponentDescriptorCompletionHandlerSignature) {
		errors.LCHComponentDescriptorCompletionHandlerSignature = [
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

export const LCHLauncherPatternMatchesURL = function (param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!param2) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (param1 === '*') {
		return true;
	};

	let match = param1.match(/^\/(.*)\/(\w*)/i);

	if (!match || !match.shift()) {
		return param2.includes(param1);
	}

	return !!param2.match(new RegExp(match[0], match[1]));
};

export const LCHRuntimeMatchingTasks = function (param1, param2) {
	if (!Array.isArray(param1)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return param1.filter(function (e) {
		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		};

		if (!LCHRecipesModelIsTask(e)) {
			return false;
		};

		if (e.LCHRecipeIsExcluded && e.LCHRecipeIsExcluded()) {
			return false;
		};

		return LCHLauncherPatternMatchesURL(e.LCHRecipeURLFilter, param2)
	})
};

import { LCHLauncherStandardRecipes } from './recipes/_aggregate.js';

export const LCHAPIRunTasks = function () {
	const inputData = LCHRuntimeMatchingTasks.apply(null, Array.from(arguments));
	const api = LCHAPIObjectFor(LCHLauncherStandardRecipes().concat(inputData));

	return Promise.all(inputData.map(function (e) {
		return LCHAPIExecuteRecipe(e, [], api);
	}))
};
