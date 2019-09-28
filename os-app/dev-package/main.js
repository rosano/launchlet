import { LCHLauncherModeCommit, LCHLauncherModePreview, LCHLauncherModePipe, LCHLauncherModes } from '../dev-launcher/ui-logic.js';

let _AppClass;
export const AppClass = function (inputData) {
	_AppClass = inputData;
};

export const LRTModeCommit = LCHLauncherModeCommit();
export const LRTModePreview = LCHLauncherModePreview();
export const LRTModePipe = LCHLauncherModePipe();

let appContainer, appInstance;

const LCHPackageValidateOptionsObject = function (inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotObject');
	}

	if (inputData.completionHandler) {
		if (typeof inputData.completionHandler !== 'function') {
			throw new Error('LCHErrorInputNotFunction');
		}
	}

	if (inputData.LRTOptionMode) {
		if (LCHLauncherModes().indexOf(inputData.LRTOptionMode) === -1) {
			throw new Error('LCHErrorInputModeNotValid');
		}
	}

	return true;
};

export const instanceCreate = function (param1 = [], param2 = {}) {
	if (instanceExists()) {
		instanceDestroy();
	}

	if (param1 && !Array.isArray(param1)) {
		throw new Error('LCHErrorInputNotArray');
	}

	if (param2) {
		try {
			LCHPackageValidateOptionsObject(param2);
		} catch(e) {
			throw e;
		}
	}

	if (typeof document !== 'undefined') {
		appContainer = document.createElement('div');
		document.body.appendChild(appContainer);
	}
	
	appInstance = new _AppClass({
		target: appContainer,
		props: {
			LCHLauncherRecipes: Array.isArray(param1) ? param1 : [],
			optionsObject: param2,
			completionHandler () {
				instanceDestroy();

				if (!param2.completionHandler) {
					return;
				}

				param2.completionHandler();
			},
		},
	});
};

export const instanceExists = function () {
	return !!appInstance;
};

export const instanceDestroy = function () {
	appInstance.$destroy();
	appInstance = undefined;

	if (typeof document === 'undefined') {
		return;
	}

	appContainer.remove();
	appContainer = undefined;
};
