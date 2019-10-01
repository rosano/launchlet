import {
	LCHLauncherModeCommit,
	LCHLauncherModePreview,
	LCHLauncherModePipe,
	LCHLauncherModeTask,
	LCHLauncherModes
} from '../dev-launcher/ui-logic.js';

import {
	LCHRuntimeMatchingTasks,
	LCHAPIObjectFor,
	LCHAPIExecuteRecipe,
} from '../dev-launcher/api.js';

import { LCHLauncherStandardRecipes } from '../dev-launcher/recipes/_aggregate.js';

export const LRTModeCommit = LCHLauncherModeCommit();
export const LRTModePreview = LCHLauncherModePreview();
export const LRTModePipe = LCHLauncherModePipe();
export const LRTModeTask = LCHLauncherModeTask();

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
		mod._CommandRunTasks(inputData, window.location.href)
	},

	_CommandRunTasks () {
		const inputData = LCHRuntimeMatchingTasks.apply(null, Array.from(arguments));
		const api = LCHAPIObjectFor(LCHLauncherStandardRecipes().concat(inputData));

		return Promise.all(inputData.map(function (e) {
			return LCHAPIExecuteRecipe(e, [], api);
		}))
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
		LRTModeTask,

		LRTSingletonCreate: mod.LifecycleSingletonCreate,
		LRTSingletonExists: mod.DataSingletonExists,
		LRTSingletonDestroy: mod.LifecycleSingletonDestroy,

		LRTTasksRun: mod.CommandRunTasks,
	};

	Object.freeze(outputData);

	return outputData;
};
