import { LCHLauncherModeDefault, LCHLauncherModeJump } from '../dev-launcher/ui-logic.js';

let _AppClass;
export const AppClass = function (inputData) {
	_AppClass = inputData;
};

export const kRunModeDefault = LCHLauncherModeDefault;
export const kRunModeJump = LCHLauncherModeJump;

let sandboxContainer, appInstance;

export const instanceCreate = function (param1 = [], param2 = {}) {
	if (instanceExists()) {
		instanceDestroy();
	}

	sandboxContainer = document.createElement('div');
	document.body.appendChild(sandboxContainer);
	
	appInstance = new _AppClass({
		target: sandboxContainer,
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

	sandboxContainer.remove();
	sandboxContainer = undefined;
};
