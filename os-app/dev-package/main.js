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

	const callback = param2.LRTOptionCompletionHandler;
	
	appInstance = new _AppClass({
		target: appContainer,
		props: {
			LRTOptions: Object.assign(param2, {
				LRTOptionRecipes: param1,
				LRTOptionCompletionHandler () {
					instanceDestroy();

					if (!callback) {
						return;
					}

					callback();
				},
			}),
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
