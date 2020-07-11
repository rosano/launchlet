import LCHLauncherLogic from '../dev-launcher/ui-logic.js';

import LCHLauncherAPI from '../dev-launcher/api.js';

export const LCHModeCommit = LCHLauncherLogic.LCHLauncherModeCommit();
export const LCHModePreview = LCHLauncherLogic.LCHLauncherModePreview();
export const LCHModePipe = LCHLauncherLogic.LCHLauncherModePipe();

export const mod = {

	// DATA

	DataSingletonExists () {
		return !!mod._ValueSingleton;
	},

	// VALUE

	_ValueClass: undefined,
	
	_ValueTarget: undefined,
	
	_ValueSingleton: undefined,

	// CONTROL

	ControlRunTasks (inputData) {
		LCHLauncherAPI.LCHAPIRunTasks(inputData, window.location.href);
	},
	
	// LIFECYCLE

	LifecycleSingletonCreate (inputData = {}) {
		if (mod._ValueSingleton) {
			mod.LifecycleSingletonDestroy();
		}

		if (typeof document !== 'undefined') {
			document.body.appendChild(mod._ValueTarget = document.createElement('div'));
		}

		mod._ValueSingleton = new mod._ValueClass({
			target: mod._ValueTarget,
			props: {
				LRTOptions: inputData,
				LRTDidFinish () {
					mod.LifecycleSingletonDestroy();

					if (typeof inputData.LCHOptionCompletionHandler !== 'function') {
						return;
					}

					inputData.LCHOptionCompletionHandler();
				},
			},
		});
	},

	LifecycleSingletonDestroy () {
		mod._ValueSingleton.$destroy();
		
		delete mod._ValueSingleton;

		if (typeof document === 'undefined') {
			return;
		}

		mod._ValueTarget.remove();

		delete mod._ValueTarget;
	},

};

export const LCHPackage = function () {
	const outputData = {
		LCHModeCommit,
		LCHModePreview,
		LCHModePipe,

		LCHSingletonCreate: mod.LifecycleSingletonCreate,
		LCHSingletonExists: mod.DataSingletonExists,
		LCHSingletonDestroy: mod.LifecycleSingletonDestroy,

		LCHTasksRun: mod.ControlRunTasks,
	};

	Object.freeze(outputData);

	return outputData;
};
