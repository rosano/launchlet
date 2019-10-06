<script>
export let LRTOptions = {};

import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

import { LCHLauncherOptions } from './ui-logic.js';
LRTOptions = LCHLauncherOptions(LRTOptions, _LCHIsTestingBehaviour() ? undefined : console.warn);

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[LRTOptions.LCHOptionLanguage]);
};

import {
	LCHLauncherModeCommit,
	LCHLauncherModePreview,
	LCHLauncherModePipe,
	// LCHLauncherFilterForText,
} from './ui-logic.js';

import { LCHRuntimeFilteredRecipes } from './api.js';
(function StartDiscardDataObjects() {
	LRTOptions.LCHOptionRecipes = LCHRuntimeFilteredRecipes(LRTOptions.LCHOptionRecipes, window.location.href);
})();

import { LCHRecipesModelErrorsFor } from './api.js';
(function StartPageRecipes() {
	if (!LRTOptions.LCHOptionIncludePageRecipes) {
		return;
	};

	let inputData = window.LCHPageRecipes;

	if (!inputData) {
		inputData = (window.wrappedJSObject || {}).LCHPageRecipes;
	};

	if (!inputData) {
		function receiveMessage(event) {
			if (event.source !== window) {
			  return console.log('not window');;
			}

			if (event.data === 'LCHPageRecipes') {
			  return;
			}

			if (!Array.isArray(event.data)) {
				return;
			}

			console.log(event.data.pop());

			window.removeEventListener('message', receiveMessage)
		}
		window.addEventListener('message', receiveMessage, false);
		window.postMessage('LCHPageRecipes', window.location.origin);
	};

	if (!Array.isArray(inputData)) {
		return;
	}

	LRTOptions.LCHOptionRecipes.push(...Array.from(inputData).map(function (e) {
		delete e.LCHRecipeURLFilter;
		delete e.LCHRecipeIsAutomatic;

		e._LCHRecipeSource = window.location.host;
		
		return e;
	}).filter(function(e) {
		return !LCHRecipesModelErrorsFor(e);
	}));
})();

import * as LCHRuntime from '../_shared/LCHRuntime/main.js'
import {
	LCHLauncherConvertTypeServiceSearch,
	LCHAPITypeEquivalenceMapForRecipes,
	LCHAPITypeNameMap,
} from './api.js';
import { LCHLauncherStandardRecipes } from './recipes/_aggregate.js';
const allRecipes = LCHLauncherStandardRecipes().map(function (e) {
	return Object.assign(e, {
		LCHRecipeName: e.LCHRecipeName || OLSKLocalized('LCHStandardRecipeNames')[e.LCHRecipeSignature], // #purge
	})
}).concat(LRTOptions.LCHOptionRecipes);

const api = LCHRuntime.LCHRuntimeAPI(allRecipes);
const apiTypeEquivalenceMap = LCHAPITypeEquivalenceMapForRecipes(allRecipes);
const typeNameMap = LCHAPITypeNameMap(allRecipes);

import { LCHAPIRunTasks } from './api.js';
(function StartRecipeTasks() {
	if (!LRTOptions.LCHOptionRunTasks) {
		return;
	};

	LCHAPIRunTasks(allRecipes, window.location.href);
})();

import {
	LCHAPIExecuteRecipe,
	LCHAPIExecuteComposition,
	LCHComponentDescriptorsModelErrorsFor,
} from './api.js';
import * as apiComponents from './recipes/_components.js';
import { writable } from 'svelte/store';
const secondaryComponent = writable(null);
async function apiStart(inputData) {
	return await (function (inputData) {
		if (!inputData) {
			return Promise.resolve(inputData);
		}

		if (typeof inputData !== 'object') {
			return Promise.resolve(inputData);
		}

		if (LCHComponentDescriptorsModelErrorsFor(inputData)) {
			return Promise.resolve(inputData);
		}

		return new Promise(function (resolve, reject) {
			let LCHInstanceProps = inputData.LCHComponentDescriptorProps;


			if (inputData.LCHComponentDescriptorOLSKLocalized) {
				Object.assign(LCHInstanceProps, {
					OLSKLocalized,
				});
			};

			LCHInstanceProps[inputData.LCHComponentDescriptorCompletionHandlerSignature] = function () {
				secondaryComponent.set(null);
				mod.commandExit();
			};

			return secondaryComponent.set({
				LCHInstanceClass: apiComponents[inputData.LCHComponentDescriptorName],
				LCHInstanceProps,
			});
		});
	})(inputData.LCHCompositionAction ? await LCHAPIExecuteComposition(inputData, api) : await LCHAPIExecuteRecipe(inputData, [], api));
}

import {
	LCHRecipesModelIsCommand,
	LCHRecipesModelIsSubject,
	LCHRecipesModelIsAction,
} from './api.js';
import { LCHLauncherUIRecipesForMode } from './ui-logic.js';
let _PromptActiveIndex = 0;

import { LCHLauncherThrottleDuration } from './ui-logic.js';
import fuzzysort from 'fuzzysort';
function ActivePromptFilterTextShouldUpdate (inputData) {
	(function SetFilterText() {
		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText = inputData;
	})();

	(function ClearFilterTextOnSubsequentPrompts() {
		for (var i = 0; i < mod._ValuePromptObjects.length; i++) {
			if (!i) {
				continue;
			}

			if (i === _PromptActiveIndex) {
				continue;
			}

			mod._ValuePromptObjects[i].LCHPromptFilterText = '';
			mod._ValuePromptObjects[i].LCHPromptMatchStop = false;
		}
	})();

	(function SetMatchStop() {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		if (mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptInputThrottle === false) {
			mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
		}

		if (!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
		}
	})();

	(function ThrottleInput() {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		if (!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return;
		}

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(mod._ValuePromptObjects[_PromptActiveIndex], 'LCHPromptInputThrottle', function (inputData) {
			return {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					mod._ValuePromptObjects[inputData].LCHPromptInputThrottle = false;
				},
			};
		}, _PromptActiveIndex);
	})();

	(function ThrottleResults() {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}
		
		if (!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return;
		}

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(mod._ValuePromptObjects[_PromptActiveIndex], 'LCHPromptResultsThrottle', function (inputData) {
			return {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					mod._ValuePromptObjects[inputData].LCHPromptResultsThrottle = false;
				},
			};
		}, _PromptActiveIndex);
	})();

	(function SetItems() {
		ActivePromptItemsShouldUpdate((function() {
			if (LRTOptions.LCHOptionMode === LCHLauncherModePipe() && !mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText && mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false) {
				return mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemsVisible;
			}
			
			if (!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				return LRTOptions.LCHOptionMode === LCHLauncherModePreview() ? mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemsAll : [];
			}

			const visibleRecipes = mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemsAll.filter(function (e) {
				return e.LCHRecipeIsExcluded ? !e.LCHRecipeIsExcluded() : true;
			});

			let results = fuzzysort.go(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText, visibleRecipes, {
				key: 'LCHRecipeName',
			});

			if (!results.length && _LCHIsTestingBehaviour() && !mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText.slice(0, 3).match(/[^A-Z]/)) {
				return visibleRecipes.filter(function (e) {
					return e.LCHRecipeSignature === mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText;
				});
			};

			if (LRTOptions.LCHOptionMode === LCHLauncherModePipe() && mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemsVisible.length && !results.length) {
				if (mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
					OLSKThrottle.OLSKThrottleSkip(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
				}

				mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptMatchStop = true;

				return mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemsVisible;
			}

			return results.sort(function (a, b) {
				return a.score < b.score ? 1 : (a.score > b.score ? -1 : 0);
			}).map(function (e) {
				return e.obj;
			});
		})());
	})();
}

function ActivePromptItemsShouldUpdate (inputData) {
	(function SetItems() {
		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemsVisible = inputData;
	})();


	(function SetItemSelected() {
		ActivePromptItemSelectedShouldUpdate(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemsVisible[0]);
	})();
}

import { LCHRecipesModelActionTakesObject } from './api.js';
import { LCHLauncherActionComparator } from './ui-logic.js';
function ActivePromptItemSelectedShouldUpdate (inputData) {
	(function SetItemSelected() {
		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemSelected = inputData;

		if (LRTOptions.LCHOptionMode !== LCHLauncherModePreview()) {
			return;
		}

		apiStart(mod._ValuePromptObjects[0].LCHPromptItemSelected);
	})();

	if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
		return;
	}

	(function UpdateActionsForSubject() {
		if (_PromptActiveIndex !== 0) {
			return;
		}

		if (!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptItemSelected) {
			mod._ValuePromptObjects[1].LCHPromptItemsVisible = mod._ValuePromptObjects[1].LCHPromptItemsAll = [];
			delete mod._ValuePromptObjects[1].LCHPromptItemSelected;

			return;
		}

		mod._ValuePromptObjects[1].LCHPromptItemsAll = mod._ValueAllActions.filter(function (e) {
			return apiTypeEquivalenceMap[inputData.LCHRecipeOutputType || 'Command'].filter(function (type) {
				return LCHRuntime.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).shift() === type;
			}).length;
		}).sort(LCHLauncherActionComparator(inputData.LCHRecipeOutputType || 'Command'));

		mod._ValuePromptObjects[1].LCHPromptItemsVisible = mod._ValuePromptObjects[1].LCHPromptItemsAll;

		mod._ValuePromptObjects[1].LCHPromptItemSelected = mod._ValuePromptObjects[1].LCHPromptItemsVisible[0];
	})();

	(function UpdateObjectsForAction() {
		if (_PromptActiveIndex > 1) {
			return;
		}

		if (!mod._ValuePromptObjects[1].LCHPromptItemSelected) {
			return;
		}

		mod._ValuePromptObjects[2].LCHPromptIsVisible = LCHRecipesModelActionTakesObject(mod._ValuePromptObjects[1].LCHPromptItemSelected);

		mod._ValuePromptObjects[2].LCHPromptItemsAll = !mod._ValuePromptObjects[2].LCHPromptIsVisible || LCHRuntime.LCHRuntimeInputTypes(mod._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop() === 'String' ? [] : mod._ValueAllSubjects.filter(function (e) {
			return apiTypeEquivalenceMap[LCHRuntime.LCHRuntimeInputTypes(mod._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop()].indexOf(e.LCHRecipeOutputType) !== -1;
		});

		mod._ValuePromptObjects[2].LCHPromptItemsVisible = mod._ValuePromptObjects[2].LCHPromptItemsAll;

		mod._ValuePromptObjects[2].LCHPromptItemSelected = mod._ValuePromptObjects[2].LCHPromptItemsVisible[0];
	})();
}

import OLSKThrottle from 'OLSKThrottle';

let rootElement;

let inputElement;
import { onMount } from 'svelte';
onMount(function () {
	if (LRTOptions.LCHOptionMode === LCHLauncherModePipe()) {
		return;
	}
	
	setTimeout(function () {
		inputElement.focus();
	});
});

import { afterUpdate } from 'svelte';
afterUpdate(function () {
	if (_LCHIsTestingBehaviour()) {
		return;
	}

	/* @LCHLauncherResultListCapAndScroll */
	let element = document.querySelector('.LCHLauncherResultListItemSelected');

	if (!element) {
		return;
	}

	element.scrollIntoView({
		block: 'nearest',
		inline: 'nearest',
	});
});

import { LCHLauncherKeyboardEventIsTextInput, LCHLauncherConstrainIndex, LCHLauncherReloadableSubjects } from './ui-logic.js';
import { LCHCompositionModelErrors } from './api.js';
import { LCHRunCommandRecipe } from './recipes/actions/LCHRunCommand/main.js';
import { LCHPrimitiveURLCallback } from './recipes/primitives/URL/main.js';
const mod = {

	// VALUE

	_ValuePromptObjects: [],

	_ValueAllPromptRecipes: [],

	_ValueAllSubjects: [],
	_ValueAllActions: [],

	ValuePromptActiveIndex (inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptActiveIndex;
		}

		(function CancelThrottle() {
			if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
				return;
			}

			if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptInputThrottle)) {
				clearTimeout(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptInputThrottle._OLSKThrottleTimeoutID);
			}
			
			mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptInputThrottle = undefined;

			if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle)) {
				clearTimeout(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID);
			}
			
			mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = undefined;
		})();

		if (!mod._ValuePromptObjects[1].LCHPromptItemsAll.length) {
			return;
		}

		(function SetIndexActive() {
			_PromptActiveIndex = inputData;
		})();

		(function ActivateDotMode() {
			if (_PromptActiveIndex !== 2) {
				return;
			}

			if (LCHRuntime.LCHRuntimeInputTypes(mod._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop() !== 'String') {
				return;
			}

			mod.ValuePromptDotModeEnabled(true);
			mod.ValuePromptDotModeText(mod.ValuePromptDotModeText());
		})();
	},
	ValuePromptDotModeEnabled (inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled;
		}

		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled = inputData;
	},
	ValuePromptDotModeText(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeText;
		}

		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeText = inputData;

		ActivePromptItemsShouldUpdate(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeText ? [{
			LCHRecipeName: mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeText,
			LCHRecipeCallback () {
				return inputData;
			},
			LCHRecipeOutputType: LCHPrimitiveURLCallback(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeText) ? 'URL' : 'String',
		}] : []);
	},
	ValuePromptResultsIsVisible (inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false;
		}

		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = inputData ? false : undefined;
	},

	// DATA

	DataComposition () {
		if (LRTOptions.LCHOptionMode === LCHLauncherModePipe()) {
			return {
				LCHCompositionAction: mod._ValuePromptObjects[1].LCHPromptItemSelected,
				LCHCompositionSubjectPrimary: mod._ValuePromptObjects[0].LCHPromptItemSelected,
				LCHCompositionSubjectSecondary: mod._ValuePromptObjects[2].LCHPromptItemSelected,
			};
		}

		return {
			LCHCompositionAction: Object.assign(LCHRunCommandRecipe(), {
				LCHRecipeName: OLSKLocalized('LCHStandardRecipeNames')[LCHRunCommandRecipe().LCHRecipeSignature],
			}),
			LCHCompositionSubjectPrimary: mod._ValuePromptObjects[0].LCHPromptItemSelected,
		};
	},

	// INTERFACE

	interfaceDidClickBody (event) {
		if (rootElement.contains(event.target)) {
	  	return;
		}

		mod.commandExit();
	},
	interfaceDidClickPrompt (inputData) {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		mod.ValuePromptActiveIndex(mod._ValuePromptObjects.indexOf(inputData));
	},
	interfaceDidKeydown (event) {
		mod.commandHandleEventKeydown(event);
	},

	InterfaceDotModeFieldDidInput (event) {
		mod.ValuePromptDotModeText(this.value);
	},

	// COMMAND
	
	_commandHandleEventKeydownModeDotMode (event) {
		const handlerFunctions = {
			Escape () {
				event.preventDefault();
				event.stopPropagation();

				return mod.ValuePromptDotModeEnabled(false) || true;
			},
			Tab () {
				event.preventDefault();
				event.stopPropagation();
				
				if (!mod.ValuePromptDotModeText()) {
					return true;
				}
				
				return mod.ValuePromptDotModeEnabled(false);
			},
			Enter () {
				return mod.ValuePromptDotModeEnabled(false);
			},
		};

		if (!handlerFunctions[event.key]) {
			return true;
		}

		return handlerFunctions[event.key]();
	},
	_commandHandleEventKeydownEscape (event) {
		event.preventDefault();
		event.stopPropagation();

		if (LRTOptions.LCHOptionMode === LCHLauncherModePipe() && mod.ValuePromptResultsIsVisible()) {
			return mod.ValuePromptResultsIsVisible(false);
		}

		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe() && mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return ActivePromptFilterTextShouldUpdate('');
		}

		mod.commandExit();
	},
	_commandHandleEventKeydownTab (event) {
		event.preventDefault();

		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		mod.ValuePromptActiveIndex(LCHLauncherConstrainIndex(mod._ValuePromptObjects.filter(function (e) {
			return e.LCHPromptIsVisible;
		}), _PromptActiveIndex + (event.shiftKey ? -1 : 1) * (function () {
			if (!_PromptActiveIndex && mod._ValuePromptObjects[2].LCHPromptIsVisible && mod._ValuePromptObjects[1].LCHPromptItemsAll.length === 1) {
				return 2;
			}

			return 1;
		})()));
	},
	_commandHandleEventKeydownEnter (event) {
		event.preventDefault();
		event.stopPropagation();

		if (LCHCompositionModelErrors(mod.DataComposition())) {
			return;
		}

		mod.commandTerminate();
	},
	_commandHandleEventKeydownArrow (event) {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (!mod.ValuePromptResultsIsVisible()) {
			return mod.ValuePromptResultsIsVisible(true);
		}

		if (!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
			return;
		}

		OLSKThrottle.OLSKThrottleSkip(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
	},
	_commandHandleEventKeydownArrowDown (event) {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === undefined) {
			mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = false;
			return;
		}

		if (!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
			return;
		}

		OLSKThrottle.OLSKThrottleSkip(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
	},
	_commandHandleEventKeydownDot (event) {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (_PromptActiveIndex !== 0) {
			return;
		}
		
		if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle)) {
			clearTimeout(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID);
		}

		mod.ValuePromptResultsIsVisible(false);
		mod.ValuePromptDotModeEnabled(true);
		ActivePromptFilterTextShouldUpdate('');
		mod.ValuePromptDotModeText(mod.ValuePromptDotModeText());

		if (mod.ValuePromptDotModeText()) {
			return;
		}

		mod._ValuePromptObjects[1].LCHPromptItemsAll = [];
		mod._ValuePromptObjects[1].LCHPromptItemsVisible = [];
		delete mod._ValuePromptObjects[1].LCHPromptItemSelected;
	},
	_commandHandleEventKeydownBackspace (event) {
		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
			return ActivePromptFilterTextShouldUpdate(mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText.slice(0, -1));
		}

		if (mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
			return ActivePromptFilterTextShouldUpdate('');
		}

		ActivePromptItemsShouldUpdate([]);

		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = undefined;

		mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeText = '';
	},
	commandHandleEventKeydown (event) {
		if (mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled && mod._commandHandleEventKeydownModeDotMode(event)) {
			return;
		}

		const handlerFunctions = {
			Escape: mod._commandHandleEventKeydownEscape,
			Tab: mod._commandHandleEventKeydownTab,
			'.': mod._commandHandleEventKeydownDot,
			Enter: mod._commandHandleEventKeydownEnter,
			ArrowUp: mod._commandHandleEventKeydownArrow,
			ArrowDown: mod._commandHandleEventKeydownArrowDown,
			Backspace: mod._commandHandleEventKeydownBackspace,
		};

		if (handlerFunctions[event.key]) {
			return handlerFunctions[event.key](event);
		}

		if (mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled) {
			return;
		}

		if (LRTOptions.LCHOptionMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (!LCHLauncherKeyboardEventIsTextInput(event)) {
			return;
		}

		ActivePromptFilterTextShouldUpdate(!mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptInputThrottle ? event.key : mod._ValuePromptObjects[_PromptActiveIndex].LCHPromptFilterText + event.key);
	},
	commandReloadSubjects (inputData) {
		let reloadSubjects = LCHLauncherReloadableSubjects([inputData]);
		
		if (!reloadSubjects.length) {
			return false;
		};

		mod._ValuePromptObjects[0].LCHPromptItemsVisible = [];
		mod._ValuePromptObjects[0].LCHPromptItemsAll = reloadSubjects;

		mod.ValuePromptActiveIndex(0);

		ActivePromptItemSelectedShouldUpdate(reloadSubjects[0]);
		
		return true;
	},
	async commandTerminate () {
		if (LRTOptions.LCHOptionMode === LCHLauncherModePipe()) {
			if (mod.commandReloadSubjects(await apiStart(mod.DataComposition()))) {
				return;
			};
		}

		if (LRTOptions.LCHOptionMode === LCHLauncherModeCommit()) {
			await apiStart(mod._ValuePromptObjects[0].LCHPromptItemSelected);
		}

		mod.commandExit();
	},
	commandExit () {
		if (typeof LRTOptions.LCHOptionCompletionHandler !== 'function') {
			return;
		}

		return LRTOptions.LCHOptionCompletionHandler();
	},

	// SETUP

	SetupEverything() {

		mod.SetupPromptObjects();
	},

	SetupPromptObjects () {
		mod._ValueAllPromptRecipes = LCHLauncherUIRecipesForMode(allRecipes, LRTOptions.LCHOptionMode);

		if (LRTOptions.LCHOptionMode === LCHLauncherModePipe()) {
			mod._ValueAllSubjects = mod._ValueAllPromptRecipes.filter(function (e) {
				if (LCHRecipesModelIsSubject(e)) {
					return true;
				};

				if (LCHRecipesModelIsCommand(e)) {
					return true;
				};

				return false;
			}).filter(function (e) {
				return !e.LCHRecipeOutputType || (Object.keys(apiTypeEquivalenceMap).indexOf(e.LCHRecipeOutputType) !== -1);
			}).map(function (e) {
				return Object.assign(e, {
					_LCHRecipeOutputTypeName: typeNameMap[e.LCHRecipeOutputType],
				})
			});

			mod._ValueAllActions = mod._ValueAllPromptRecipes.filter(LCHRecipesModelIsAction);

			let _ActionableTypesForPrimarySubject = Object.keys(apiTypeEquivalenceMap).filter(function (type) {
				return mod._ValueAllActions.filter(function (e) {
					return LCHRuntime.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).shift() === type;
				}).length;
			});

			return mod._ValuePromptObjects.push(...[{
				LCHPromptClass: 'LCHLauncherSubjectPrompt',
				LCHPromptHeading: OLSKLocalized('LCHLauncherSubjectPromptHeadingText'),
				LCHPromptItemsVisible: [],
				LCHPromptItemsAll: mod._ValueAllSubjects.filter(function (e) {
					return !e.LCHRecipeOutputType || _ActionableTypesForPrimarySubject.indexOf(e.LCHRecipeOutputType) !== -1;
				}),
				// LCHPromptItemSelected: null,
				LCHPromptInputThrottle: undefined,
				LCHPromptFilterText: '',
				LCHPromptMatchStop: false,
				LCHPromptResultsThrottle: undefined,
				LCHPromptDotModeText: '',
				LCHPromptIsVisible: true,
			}, {
				LCHPromptClass: 'LCHLauncherActionPrompt',
				LCHPromptHeading: OLSKLocalized('LCHLauncherActionPromptHeadingText'),
				LCHPromptItemsVisible: [],
				LCHPromptItemsAll: [],
				// LCHPromptItemSelected: null,
				LCHPromptInputThrottle: undefined,
				LCHPromptFilterText: '',
				LCHPromptMatchStop: false,
				LCHPromptResultsThrottle: undefined,
				LCHPromptIsVisible: true,
			}, {
				LCHPromptClass: 'LCHLauncherObjectPrompt',
				LCHPromptHeading: OLSKLocalized('LCHLauncherObjectPromptHeadingText'),
				LCHPromptItemsVisible: [],
				LCHPromptItemsAll: [],
				// LCHPromptItemSelected: null,
				LCHPromptInputThrottle: undefined,
				LCHPromptFilterText: '',
				LCHPromptMatchStop: false,
				LCHPromptResultsThrottle: undefined,
				LCHPromptDotModeText: '',
				LCHPromptIsVisible: false,
			}]);
		}

		mod._ValuePromptObjects.push({
			LCHPromptClass: 'LCHLauncherFilterPrompt',
			LCHPromptItemsVisible: [],
			LCHPromptItemsAll: mod._ValueAllPromptRecipes,
			LCHPromptFilterText: '',
			LCHPromptResultsThrottle: false,
			LCHPromptIsVisible: true,
		 });

		if (LRTOptions.LCHOptionMode !== LCHLauncherModePreview()) {
			return;
		}

		mod._ValuePromptObjects[0].LCHPromptItemsVisible = mod._ValuePromptObjects[0].LCHPromptItemsAll;

		mod._ValuePromptObjects[0].LCHPromptItemSelected = mod._ValuePromptObjects[0].LCHPromptItemsAll.filter(function (e) {
			return e._LCHRecipeIsSelected;
		}).shift();
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleWillMount();

import LCHLauncherPrompt from './submodules/LCHLauncherPrompt/main.svelte';
import LCHLauncherPipeItem from './submodules/LCHLauncherPipeItem/main.svelte';
</script>
<svelte:window on:keydown={ mod.interfaceDidKeydown } on:click={ mod.interfaceDidClickBody } on:touchstart={ mod.interfaceDidClickBody }/>

<div class="Container LCHLauncher" bind:this={ rootElement }>

{#each mod._ValuePromptObjects as e}

{#if e.LCHPromptIsVisible}

<div class={ e.LCHPromptClass } class:LCHLauncherPromptSelected={ mod._ValuePromptObjects[_PromptActiveIndex] === e } on:click={ () => mod.interfaceDidClickPrompt(e) }>
	{#if LRTOptions.LCHOptionMode === LCHLauncherModePipe()}
		<strong class="LCHLauncherPromptHeading" class:LCHLauncherPromptHeadingMatchStop={ e.LCHPromptMatchStop }>{ e.LCHPromptFilterText && e.LCHPromptFilterText.toUpperCase() || e.LCHPromptHeading }</strong>
	{/if}

	<LCHLauncherPrompt
		PromptItems={ e.LCHPromptItemsVisible }
		ItemSelected={ e.LCHPromptItemSelected }
		ItemSelectedHidden={ LRTOptions.LCHOptionMode !== LCHLauncherModePipe() || e.LCHPromptDotModeEnabled }
		ResultsHidden={ e.LCHPromptResultsThrottle !== false }
		on:ResultListDispatchArrow={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) }
		on:ResultListDispatchClick={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) || mod.commandTerminate() }
		>
		{#if e.LCHPromptClass === 'LCHLauncherSubjectPrompt' && !e.LCHPromptDotModeEnabled }
			<span class="LCHLauncherSubjectPromptPlaceholder">{ OLSKLocalized('LCHLauncherSubjectPromptPlaceholderText') }</span>
		{/if}

		{#if e.LCHPromptClass === 'LCHLauncherFilterPrompt' }
			<input class="LCHLauncherFilterInput" placeholder="{ LRTOptions.LCHOptionMode === LCHLauncherModePreview() ? OLSKLocalized('LCHLauncherInputPlaceholderPreview') : OLSKLocalized('LCHLauncherInputPlaceholderDefault') }" bind:value={ mod._ValuePromptObjects[0].LCHPromptFilterText } bind:this={ inputElement } on:input={ () => ActivePromptFilterTextShouldUpdate(inputElement.value) } />
		{/if}

		{#if ['LCHLauncherFilterPrompt', 'LCHLauncherActionPrompt'].indexOf(e.LCHPromptClass) === -1 && e.LCHPromptDotModeEnabled }
			<input bind:value={ e.LCHPromptDotModeText } on:input={ mod.InterfaceDotModeFieldDidInput } class="LCHLauncherPromptDotModeInput" autofocus />
		{/if}
	</LCHLauncherPrompt>
</div>

{/if}

{/each}

</div>
	
{#if $secondaryComponent}
	<svelte:component this={ $secondaryComponent.LCHInstanceClass } {...$secondaryComponent.LCHInstanceProps} />
{/if}

<style src="./ui-style.css"></style>
