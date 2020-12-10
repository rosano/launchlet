import LCHFormula from '../_shared/LCHFormula/main.js';

import LCHRuntime from '../_shared/LCHRuntime/main.js';
import { LCHTypeServiceSearchRecipe } from './recipes/types/ServiceSearch/main.js';
import { LCHLauncherStandardRecipes } from './recipes/_aggregate.js';

Array.prototype._LCHIntersect = function() {
	return this.map(function (e) {
		return new Set(e);
	}).reduce(function (a, b) {
		return a.filter(i => b.has(i));
	}, [...new Set([].concat.apply([], this))]);
};

const mod = {

	LCHRecipesModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		const errors = LCHFormula.LCHFormulaTo(LCHFormula.LCHFormulaModelErrorsFor(LCHFormula.LCHFormulaFrom(inputData)) || {}, 'LCHRecipe');

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
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	LCHRecipesModelIsCommand (inputData) {
		if (mod.LCHRecipesModelErrorsFor(inputData)) {
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
	},

	LCHRecipesModelIsSubject (inputData) {
		if (mod.LCHRecipesModelErrorsFor(inputData)) {
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
	},

	LCHRecipesModelIsAction (inputData) {
		if (mod.LCHRecipesModelErrorsFor(inputData)) {
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
	},

	LCHRecipesModelIsType (inputData) {
		if (mod.LCHRecipesModelErrorsFor(inputData)) {
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
	},

	LCHRecipesModelIsTask (inputData) {
		if (mod.LCHRecipesModelErrorsFor(inputData)) {
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
	},

	LCHLauncherConvertTypeServiceSearch (inputData, _stringCallback) {
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
	},

	LCHRecipesModelActionTakesObject (inputData) {
		if (mod.LCHRecipesModelErrorsFor(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!mod.LCHRecipesModelIsAction(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}
		
		if (LCHRuntime.LCHRuntimeInputTypes(inputData.LCHRecipeInputTypes).length < 2) {
			return false;
		}
		
		// if (inputData.LCHRecipeCallback.length < 2) {
		// 	return false;
		// }

		return true;
	},

	LCHRecipesModelActionTakesParams (inputData) {
		if (mod.LCHRecipesModelErrorsFor(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!mod.LCHRecipesModelIsAction(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}
		
		if (LCHRuntime.LCHRuntimeInputTypes(inputData.LCHRecipeInputTypes).pop() !== 'Object') {
			return false;
		}
		
		// if (inputData.LCHRecipeCallback.length !== LCHRuntime.LCHRuntimeInputTypes(inputData.LCHRecipeInputTypes).length) {
		// 	return false;
		// }

		return true;
	},

	LCHAPITypeEquivalenceMapForRecipes (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		const uniqueSignatures = [];
		const validRecipes = inputData.filter(function (e) {
			if (mod.LCHRecipesModelErrorsFor(e)) {
				return false;
			}

			if (!mod.LCHRecipesModelIsType(e)) {
				return false;
			}

			if (!e.LCHRecipeCallback(e.LCHRecipeCanonicalExampleCallback())) {
				return false;
			}

			if (uniqueSignatures.includes(e.LCHRecipeSignature)) {
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
	},

	LCHAPITypeNameMap (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		const validRecipes = inputData.filter(function (e) {
			if (mod.LCHRecipesModelErrorsFor(e)) {
				return false;
			}

			return mod.LCHRecipesModelIsType(e);
		});

		return validRecipes.reduce(function (coll, item) {
			if (coll[item.LCHRecipeSignature]) {
				return coll;
			}

			coll[item.LCHRecipeSignature] = item.LCHRecipeName || item.LCHRecipeSignature;

			return coll;
		}, {});
	},

	LCHAPIActionsForType (param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('LCHErrorInputNotValid');
		}

		return param2.filter(function (e) {
			if (mod.LCHRecipesModelErrorsFor(e)) {
				return false;
			}

			if (!mod.LCHRecipesModelIsAction(e)) {
				return false;
			}

			if (LCHRuntime.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).shift() !== param1) {
				return false;
			}

			return true;
		});
	},

	LCHAPISubjectsForType (param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('LCHErrorInputNotValid');
		}

		return param2.filter(function (e) {
			if (mod.LCHRecipesModelErrorsFor(e)) {
				return false;
			}

			if (!mod.LCHRecipesModelIsSubject(e)) {
				return false;
			}

			if (e.LCHRecipeOutputType !== param1) {
				return false;
			}

			return true;
		});
	},

	LCHCompositionModelErrors (inputData) {
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

		if (!mod.LCHRecipesModelIsAction(inputData.LCHCompositionAction)) {
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
		} else if (inputData.LCHCompositionAction.LCHRecipeInputTypes === 'Command' && mod.LCHRecipesModelIsCommand(inputData.LCHCompositionSubjectPrimary)) {

		}

		// if (!mod.LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectPrimary)) {
		// 	errors.LCHCompositionSubjectPrimary = [
		// 		'LCHErrorInputNotValid',
		// 	];
		// }

		else if (inputData.LCHCompositionAction.LCHRecipeInputTypes && !LCHRuntime.LCHRuntimeInputTypes(inputData.LCHCompositionAction.LCHRecipeInputTypes).includes(inputData.LCHCompositionSubjectPrimary.LCHRecipeOutputType)) {
			errors.LCHCompositionSubjectPrimary = [
				'LCHErrorInputNotValid',
			];
		}

		if (inputData.LCHCompositionAction.LCHRecipeInputTypes && LCHRuntime.LCHRuntimeInputTypes(inputData.LCHCompositionAction.LCHRecipeInputTypes).length === 2 && !inputData.LCHCompositionSubjectSecondary) {
			errors.LCHCompositionSubjectSecondary = [
				'LCHErrorInputNotValid',
			];
		}

		if (inputData.LCHCompositionSubjectSecondary !== undefined) {
			if (!mod.LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectSecondary)) {
				errors.LCHCompositionSubjectSecondary = [
					'LCHErrorInputNotValid',
				];
			}

			if (inputData.LCHCompositionAction.LCHRecipeInputTypes && !LCHRuntime.LCHRuntimeInputTypes(inputData.LCHCompositionAction.LCHRecipeInputTypes).includes(inputData.LCHCompositionSubjectSecondary.LCHRecipeOutputType)) {
				errors.LCHCompositionSubjectSecondary = [
					'LCHErrorInputNotValid',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	async LCHAPIExecuteComposition (inputData, api = {}) {
		if (mod.LCHCompositionModelErrors(inputData)) {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		if (typeof api.fn !== 'function') {
			return Promise.reject(new Error('LCHErrorInputNotValid'));
		}

		return mod.LCHAPIExecuteRecipe(inputData.LCHCompositionAction, [
			await mod.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectPrimary, [], api),
		].concat(inputData.LCHCompositionSubjectSecondary ? [
			await mod.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectSecondary, [], api),
		] : []), api);
	},

	async LCHAPIExecuteRecipe (param1, param2 = [], param3 = {}) {
		if (mod.LCHRecipesModelErrorsFor(param1)) {
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
		}, param2.length ? param2 : undefined)); // #mysterious Firefox throws `Permission denied to access property "length"` if array is empty
	},

	LCHComponentDescriptorsModelErrorsFor (inputData) {
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
	},

	LCHRuntimeFilteredRecipes  (param1, param2) {
		if (!Array.isArray(param1)) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return param1.filter(function (e) {
			if (mod.LCHRecipesModelErrorsFor(e)) {
				return false;
			}

			if (typeof e.LCHRecipeURLFilter === 'undefined') {
				return true;
			}

			return LCHRuntime.LCHRuntimeURLFilter(e.LCHRecipeURLFilter, param2);
		});
	},

	LCHRuntimeFilteredTasks  (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('LCHErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!mod.LCHRecipesModelIsTask(e)) {
				return false;
			}

			if (e.LCHRecipeIsExcluded) {
				return !e.LCHRecipeIsExcluded();
			}

			return true;
		});
	},

	LCHAPIRunTasks  () {
		const inputData = mod.LCHRuntimeFilteredRecipes.apply(null, [...arguments]);
		const api = LCHRuntime.LCHRuntimeAPI(LCHLauncherStandardRecipes().concat(inputData));

		return Promise.all(mod.LCHRuntimeFilteredTasks(inputData).map(function (e) {
			return mod.LCHAPIExecuteRecipe(e, [], api);
		}));
	},

	LCHRecipeProxyModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			return {};
		}

		const errors = {};

		if (typeof inputData.LCHRecipeProxyName !== 'string') {
			errors.LCHRecipeProxyName = [
				'LCHErrorNotString',
			];
		}

		if (typeof inputData.LCHRecipeProxySignature !== 'string') {
			errors.LCHRecipeProxySignature = [
				'LCHErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
