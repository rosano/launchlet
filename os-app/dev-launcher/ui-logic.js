import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

export const LCHLauncherOptions = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const outputData = {
		runMode: LCHLauncherModes().shift(),

		languageCode: 'en',
	};

	if (inputData.runMode) {
		// #mysterious Why doesn't function equivalency work here?
		//  always returns -1
		outputData.runMode = LCHLauncherModes()[LCHLauncherModes().indexOf(inputData.runMode)] || outputData.runMode;
	}

	if (inputData.languageCode) {
		outputData.languageCode = inputData.languageCode;
	}

	return outputData;
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

export const LCHLauncherModes = function () {
	return [
		LCHLauncherModeCommit(),
		LCHLauncherModePreview(),
		LCHLauncherModePipe(),
	];
};

import { LCHRecipesModelIsCommand, LCHRecipesModelIsAction } from './api.js';
export const LCHLauncherUIRecipesForMode = function (param1, param2) {
	if (!Array.isArray(param1)) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (LCHLauncherModes().indexOf(param2) === -1) {
		throw new Error('LCHErrorInputInvalid');
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
// 		throw new Error('LCHErrorInputInvalid');
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

export const LCHLauncherThrottleDuration = _LCHIsTestingBehaviour() ? 25 : 1000;

export const LCHLauncherPatternMatchesURL = function (param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!param2) {
		throw new Error('LCHErrorInputInvalid');
	}

	let match = param1.match(/^\/(.*)\/(\w*)/i);

	if (!match || !match.shift()) {
		return param2.includes(param1);
	}

	return !!param2.match(new RegExp(match[0], match[1]));
};

export const LCHLauncherKeyboardEventIsTextInput = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	if ([
		inputData.metaKey,
		inputData.shiftKey,
		inputData.ctrlKey,
		inputData.altKey,
	].indexOf(true) !== -1) {
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
	].indexOf(inputData.key) !== -1) {
		return false;
	}
	
	return true;
};

export const LCHLauncherActionComparator = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
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
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof param2 !== 'number') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (param2 < 0) {
		return param1.length - 1;
	}

	if (param2 >= param1.length) {
		return 0;
	}

	return param2;
};

