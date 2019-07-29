import { LCHLauncherModeDefault, LCHLauncherModeJump } from '../dev-launcher/ui-logic.js';

let _AppClass;
export const AppClass = function (inputData) {
	_AppClass = inputData;
};

export const kRunModeDefault = LCHLauncherModeDefault;
export const kRunModeJump = LCHLauncherModeJump;

let SandboxContainer, AppInstance;

export const instanceCreate = function (param1 = [], param2 = {}) {
	if (instanceExists()) {
		instanceDestroy();
	}

	SandboxContainer = document.createElement('div');
	document.body.appendChild(SandboxContainer);
	
	AppInstance = new _AppClass({
		target: SandboxContainer,
		props: {
			formulaObjects: Array.isArray(param1) ? param1 : [],
			optionsObject: Object.assign(param2, {
				_didFinish () {
					return instanceDestroy();
				},
			}),
		},
	});
};

export const instanceExists = function () {
	return !!AppInstance;
};

export const instanceDestroy = function () {
	AppInstance.$destroy();
	AppInstance = undefined;

	SandboxContainer.remove();
	SandboxContainer = undefined;
};
