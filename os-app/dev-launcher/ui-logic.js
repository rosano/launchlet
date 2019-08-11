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

export const LCHLauncherModeJump = function () {
	return 'kLCHLauncherModeJump';
};

export const LCHLauncherModePipe = function () {
	return 'kLCHLauncherModePipe';
};

export const LCHLauncherModes = function () {
	return [
		LCHLauncherModeCommit,
		LCHLauncherModeJump,
		LCHLauncherModePipe,
	];
};

import * as _fuzzysearch from 'fuzzysearch';
const fuzzysearch = typeof _fuzzysearch === 'function' ? _fuzzysearch : _fuzzysearch.default;
export const LCHLauncherFilterForText = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return function (e) {
		return [e.LCHRecipeTitle].filter(function (e) {
			if (!e) {
				return false;
			}

			return fuzzysearch(inputData.toLowerCase(), e.toLowerCase());
		}).length > 0;
	};
};

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

	let pattern = param1;

	let match = param1.match(/^\/(.*)\/(\w*)/i);
	if (match && match.shift()) {
		pattern = new RegExp(match[0], match[1]);
	}

	return !!param2.match(pattern);
};

export const LCHLauncherKeyboardEventIsTextInput = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (inputData.metaKey) {
		return false;
	}

	if (inputData.shiftKey) {
		return false;
	}

	if (inputData.ctrlKey) {
		return false;
	}

	if (inputData.altKey) {
		return false;
	}

	if (!inputData.key) {
		return false;
	}

	if (inputData.key === 'Unidentified') {
		return false;
	}

	if (inputData.key === 'Tab') {
		return false;
	}

	if (inputData.key === 'CapsLock') {
		return false;
	}

	if (inputData.key === 'ArrowRight') {
		return false;
	}

	if (inputData.key === 'ArrowLeft') {
		return false;
	}

	if (inputData.key === 'Backspace') {
		return false;
	}

	if (inputData.key === '\\') {
		return false;
	}

	if (inputData.key === '.') {
		return false;
	}

	if (inputData.key === ',') {
		return false;
	}

	if (inputData.key === ' ') {
		return false;
	}

	return true;
};
