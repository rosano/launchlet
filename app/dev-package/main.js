import {
	LCHLauncherModeCommit,
	LCHLauncherModePreview,
	LCHLauncherModePipe,
	LCHLauncherModes
} from '../dev-launcher/ui-logic.js';

import {
	LCHAPIRunTasks,
} from '../dev-launcher/api.js';

export const LRTModeCommit = LCHLauncherModeCommit();
export const LRTModePreview = LCHLauncherModePreview();
export const LRTModePipe = LCHLauncherModePipe();

export const mod = {

	// DATA

	DataSingletonExists () {
		return !!mod._ValueSingleton;
	},

	// VALUE

	_ValueClass: undefined,
	
	_ValueTarget: undefined,
	
	_ValueSingleton: undefined,

	// COMMAND

	CommandRunTasks (inputData) {
		LCHAPIRunTasks(inputData, window.location.href)
	},
	
	// LIFECYCLE

	LifecycleSingletonCreate (inputData = {}) {
		if (mod._ValueSingleton) {
			mod.LifecycleSingletonDestroy();
		}

		if (typeof document !== 'undefined') {
			document.body.appendChild(mod._ValueTarget = document.createElement('div'));
		}

		const callback = inputData.LRTOptionCompletionHandler;

		mod._ValueSingleton = new mod._ValueClass({
			target: mod._ValueTarget,
			props: {
				LRTOptions: Object.assign(inputData, {
					LRTOptionCompletionHandler () {
						mod.LifecycleSingletonDestroy();

						if (!callback) {
							return;
						}

						callback();
					},
				}),
			},
		});
	},

	LifecycleSingletonDestroy () {
		mod._ValueSingleton.$destroy();
		
		delete mod._ValueSingleton

		if (typeof document === 'undefined') {
			return;
		}

		mod._ValueTarget.remove();

		delete mod._ValueTarget;
	},

};

export const LCHPackage = function () {
	const outputData = {
		LRTModeCommit,
		LRTModePreview,
		LRTModePipe,

		LRTSingletonCreate: mod.LifecycleSingletonCreate,
		LRTSingletonExists: mod.DataSingletonExists,
		LRTSingletonDestroy: mod.LifecycleSingletonDestroy,

		LRTTasksRun: mod.CommandRunTasks,
	};

	Object.freeze(outputData);

	return outputData;
};
