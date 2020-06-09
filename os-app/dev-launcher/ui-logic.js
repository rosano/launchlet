import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

export const LCHLauncherOptions = function (inputData, notify = function () {}) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (typeof inputData.LCHOptionRecipes === 'undefined') {
		inputData.LCHOptionRecipes = []
	};

	if (!Array.isArray(inputData.LCHOptionRecipes)) {
		throw new Error('LCHOptionRecipesNotArray');
	};

	inputData.LCHOptionRecipes = inputData.LCHOptionRecipes.filter(function (e) {
		const errors = LCHRecipesModelErrorsFor(e);

		if (errors) {
			notify('LCHOptionRecipesItemNotValid', e, errors)
		};

		return !errors;
	})

	if (typeof inputData.LCHOptionMode === 'undefined') {
		inputData.LCHOptionMode = LCHLauncherModes().shift()
	};

	if (typeof inputData.LCHOptionMode !== 'undefined') {
		if (!LCHLauncherModes().includes(inputData.LCHOptionMode)) {
			throw new Error('LCHOptionModeNotValid');
		};
	};

	if (typeof inputData.LCHOptionCompletionHandler !== 'undefined') {
		if (typeof inputData.LCHOptionCompletionHandler !== 'function') {
			throw new Error('LCHOptionCompletionHandlerNotFunction');
		};
	};

	if (typeof inputData.LCHOptionLanguage === 'undefined') {
		inputData.LCHOptionLanguage = 'en';
	};

	if (typeof inputData.LCHOptionLanguage !== 'string') {
		throw new Error('LCHOptionLanguageNotString')
	};

	return inputData;
};

export const LCHLauncherModeCommit = function () {
	return 'kLCHLauncherModeCommit';
};

export const LCHLauncherModePreview = function () {
	return 'kLCHLauncherModePreview';
};

export const LCHLauncherModePipe = function () {
	return 'kLCHLauncherModePipe';
};

export const LCHLauncherModeTask = function () {
	return 'kLCHLauncherModeTask';
};

export const LCHLauncherModes = function () {
	return [
		LCHLauncherModeCommit(),
		LCHLauncherModePreview(),
		LCHLauncherModePipe(),
		LCHLauncherModeTask(),
	];
};

import { LCHRecipesModelIsCommand, LCHRecipesModelIsAction } from './api.js';
export const LCHLauncherUIRecipesForMode = function (param1, param2) {
	if (!Array.isArray(param1)) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!LCHLauncherModes().includes(param2)) {
		throw new Error('LCHErrorInputNotValid');
	}

	return param1.filter(function (e) {
		if (typeof e !== 'object' || e === null) {
			return false;
		}

		if (typeof e.LCHRecipeInputTypes === 'string' && e.LCHRecipeInputTypes.split(',').length > 2) {
			return false;
		}

		if (param2 === LCHLauncherModeCommit()) {
			return LCHRecipesModelIsCommand(e);
			// if (LCHRecipesModelIsCommand(e)) {
			// 	return true;
			// };

			// if (!LCHRecipesModelIsAction(e)) {
			// 	return false;
			// };

			// if (e.LCHRecipeCallback.length !== 1) {
			// 	return false;
			// };

			// if (e.LCHRecipeInputTypes !== 'String') {
			// 	return false;
			// };

			// if (e._LCHLauncherGenerated !== true) {
			// 	return false;
			// };
		}

		if (param2 === LCHLauncherModePreview()) {
			return LCHRecipesModelIsCommand(e);
		}
		
		return true;
	});
};

// import * as _fuzzysearch from 'fuzzysearch';
// const fuzzysearch = typeof _fuzzysearch === 'function' ? _fuzzysearch : _fuzzysearch.default;
// export const LCHLauncherFilterForText = function (inputData) {
// 	if (typeof inputData !== 'string') {
// 		throw new Error('LCHErrorInputNotValid');
// 	}

// 	return function (e) {
// 		return [e.LCHRecipeName].filter(function (e) {
// 			if (!e) {
// 				return false;
// 			}

// 			return fuzzysearch(inputData.toLowerCase(), e.toLowerCase());
// 		}).length > 0;
// 	};
// };

export const LCHLauncherThrottleDuration = OLSK_TESTING_BEHAVIOUR() ? 25 : 1000;

export const LCHLauncherKeyboardEventIsTextInput = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	if ([
		inputData.metaKey,
		inputData.shiftKey,
		inputData.ctrlKey,
		inputData.altKey,
	].includes(true)) {
		return false;
	}

	if (!inputData.key) {
		return false;
	}
	
	if ([
		'Unidentified',
		'Tab',
		'CapsLock',
		'ArrowRight',
		'ArrowLeft',
		'Backspace',
		'\\',
		'.',
		',',
		' ',
	].includes(inputData.key)) {
		return false;
	}
	
	return true;
};

export const LCHLauncherActionComparator = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return function (a, b) {
		const param1s = [
			a.LCHRecipeInputTypes.split(',')[0],
			b.LCHRecipeInputTypes.split(',')[0],
		];
		const param2s = [
			a.LCHRecipeInputTypes.split(',')[1],
			b.LCHRecipeInputTypes.split(',')[1],
		];

		if (param1s[0] === inputData && param1s[1] === inputData) {
			if (!param2s[0] && param2s[1]) {
				return -1;
			}

			if (param2s[0] && !param2s[1]) {
				return 1;
			}
		}

		if (param1s[0] === inputData && param1s[1] !== inputData) {
			return -1;
		}

		if (param1s[1] === inputData && param1s[0] !== inputData) {
			return 1;
		}

		return 1;
	};
};

export const LCHLauncherConstrainIndex = function (param1, param2) {
	if (!Array.isArray(param1)) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (typeof param2 !== 'number') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (param2 < 0) {
		return param1.length - 1;
	}

	if (param2 >= param1.length) {
		return 0;
	}

	return param2;
};

import { LCHRecipesModelErrorsFor, LCHRecipesModelIsSubject } from './api.js';
export const LCHLauncherReloadableSubjects = function (inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputNotValid');
	}

	return [].concat.apply([], inputData).filter(function (e) {
		if (typeof e !== 'object' || e === null) {
			return false;
		}

		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		};

		if (!LCHRecipesModelIsSubject(e)) {
			return false;
		};

		return true;
	});
};
