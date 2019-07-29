import { LCHLauncherModeDefault, LCHLauncherModeJump } from '../dev-launcher/ui-logic.js';

let _AppClass;
export const AppClass = function (inputData) {
	_AppClass = inputData;
};

export const kRunModeDefault = LCHLauncherModeDefault;
export const kRunModeJump = LCHLauncherModeJump;

let appContainer, appInstance;

export const instanceCreate = function (param1 = [], param2 = {}) {
	if (instanceExists()) {
		instanceDestroy();
	}

	appContainer = document.createElement('div');
	document.body.appendChild(appContainer);
	
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

	appContainer.remove();
	appContainer = undefined;
};
