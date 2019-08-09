import { LCHLauncherModeCommit, LCHLauncherModeJump, LCHLauncherModes } from '../dev-launcher/ui-logic.js';

let _AppClass;
export const AppClass = function (inputData) {
	_AppClass = inputData;
};

export const kRunModeDefault = LCHLauncherModeCommit;
export const kRunModeJump = LCHLauncherModeJump;

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

	if (inputData.runMode) {
		if (LCHLauncherModes().indexOf(inputData.runMode) === -1) {
			throw new Error('LCHErrorInputNotValidRunMode');
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
			dataObjects: Array.isArray(param1) ? param1 : [],
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
