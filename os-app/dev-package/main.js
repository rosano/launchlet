import { LCHLauncherModeCommit, LCHLauncherModePreview, LCHLauncherModePipe, LCHLauncherModes } from '../dev-launcher/ui-logic.js';

let _AppClass;
export const AppClass = function (inputData) {
	_AppClass = inputData;
};

export const LRTModeCommit = LCHLauncherModeCommit();
export const LRTModePreview = LCHLauncherModePreview();
export const LRTModePipe = LCHLauncherModePipe();

let appContainer, appInstance;

export const instanceCreate = function (param1 = [], param2 = {}) {
	if (instanceExists()) {
		instanceDestroy();
	}

	if (typeof document !== 'undefined') {
		appContainer = document.createElement('div');
		document.body.appendChild(appContainer);
	}
	
	appInstance = new _AppClass({
		target: appContainer,
		props: {
			LRTRecipes: param1,
			LRTOptions: param2,
			LRTCompletionHandler () {
				instanceDestroy();

				if (!param2.LRTCompletionHandler) {
					return;
				}

				param2.LRTCompletionHandler();
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
