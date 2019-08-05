export const LCHLauncherOptions = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	return {
		languageCode: !inputData.languageCode ? 'en' : inputData.languageCode,
		runMode: LCHLauncherModes().indexOf(inputData.runMode) === -1 ? LCHLauncherModes().shift() : inputData.runMode,
	};
};

export const LCHLauncherModeDefault = 'default';
export const LCHLauncherModeJump = 'jump';
export const LCHLauncherModes = function () {
	return [
		LCHLauncherModeDefault,
		LCHLauncherModeJump,
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
