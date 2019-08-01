import * as LCHCopyToClipboard from './formulas/LCHCopyToClipboard/main.js';

export const LCHLauncherOptions = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	return {
		languageCode: !inputData.languageCode ? 'en' : inputData.languageCode,
		runMode: LCHLauncherModes().indexOf(inputData.runMode) === -1 ? LCHLauncherModes().shift() : inputData.runMode,
	};
};

export const LCHLauncherModeDefault = 'default'
export const LCHLauncherModeJump = 'jump'
export const LCHLauncherModes = function () {
	return [
		LCHLauncherModeDefault,
		LCHLauncherModeJump,
	];
}

export const LCHLauncherLogicFilterFor = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return function (e) {
		return [].concat([e.LCHRecipeTitle]).filter(function (e) {
			if (!e) {
				return false;
			}

			return e.match(new RegExp(inputData, 'i'));
		}).length > 0;
	};
};

export const LCHLauncherLogicConstrainIndex = function (param1, param2) {
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

export const LCHLauncherRecipes = function() {
	return [].concat.apply([], [LCHCopyToClipboard].map(function (e) {
		return Object.entries(e).map(function (e) {
			return {
				LCHRecipeSignature: e.shift(),
				LCHRecipeCallback: e.pop(),
			};
		});
	}));
};
