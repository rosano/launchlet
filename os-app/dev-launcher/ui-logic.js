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
		// LCHLauncherModes().indexOf(inputData.runMode) always returns -1
		outputData.runMode = LCHLauncherModes()[LCHLauncherModes().map(function (e) {
			return e.toString();
		}).indexOf(inputData.runMode.toString())] || outputData.runMode;
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
		LCHLauncherModeCommit,
		LCHLauncherModePreview,
		LCHLauncherModePipe,
	];
};

// import * as _fuzzysearch from 'fuzzysearch';
// const fuzzysearch = typeof _fuzzysearch === 'function' ? _fuzzysearch : _fuzzysearch.default;
// export const LCHLauncherFilterForText = function (inputData) {
// 	if (typeof inputData !== 'string') {
// 		throw new Error('LCHErrorInputInvalid');
// 	}

// 	return function (e) {
// 		return [e.LCHRecipeTitle].filter(function (e) {
// 			if (!e) {
// 				return false;
// 			}

// 			return fuzzysearch(inputData.toLowerCase(), e.toLowerCase());
// 		}).length > 0;
// 	};
// };

export const LCHLauncherThrottleDuration = _LCHIsTestingBehaviour() ? 25 : 1000;

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
	};
	
	return true;
};
