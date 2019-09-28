<script>
export let LCHLauncherRecipes = [];
export let completionHandler;
export let optionsObject = {};

import LCHLauncherPrompt from './components/LCHLauncherPrompt/main.svelte';
import LCHLauncherPipeItem from './components/LCHLauncherPipeItem/main.svelte';

import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

import { LCHLauncherOptions } from './ui-logic.js';
let LRTOptions = LCHLauncherOptions(optionsObject);

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[LRTOptions.languageCode]);
};

import {
	LCHLauncherModeCommit,
	LCHLauncherModePreview,
	LCHLauncherModePipe,
	// LCHLauncherFilterForText,
} from './ui-logic.js';

import { LCHLauncherPatternMatchesURL } from './ui-logic.js';
(function StartDiscardDataObjects() {
	LCHLauncherRecipes = LCHLauncherRecipes.filter(function (e) {
		if (LCHRecipesModelErrorsFor(e)) {
			return false;
		}

		if (e.LCHRecipeURLFilter && !LCHLauncherPatternMatchesURL(e.LCHRecipeURLFilter, window.location.href)) {
			return false;
		}
		
		return true;
	});
})();

import { LCHRecipesModelErrorsFor } from './api.js';
(function StartPageRecipes() {
	if (!optionsObject.LCHOptionIncludePageRecipes) {
		return;
	};
	
	if (!Array.isArray(window.LCHPageRecipes)) {
		return;
	}

	let pageRecipes = window.LCHPageRecipes;

	if (!Array.isArray(pageRecipes)) {
		return;
	}

	LCHLauncherRecipes.push(...pageRecipes.map(function (e) {
		delete e.LCHRecipeURLFilter;
		delete e.LCHRecipeIsAutomatic;

		e._LCHRecipeSource = window.location.host;
		
		return e;
	}).filter(function(e) {
		return !LCHRecipesModelErrorsFor(e);
	}));
})();

import {
	LCHAPIObjectFor,
	LCHLauncherConvertTypeServiceSearch,
	LCHAPITypeEquivalenceMapForRecipes,
	LCHAPITypeNameMap,
} from './api.js';
import { LCHLauncherStandardRecipes } from './recipes/_aggregate.js';
const allRecipes = LCHLauncherStandardRecipes().map(function (e) {
	return Object.assign(e, {
		LCHRecipeName: e.LCHRecipeName || OLSKLocalized('LCHStandardRecipeNames')[e.LCHRecipeSignature], // #purge
	})
}).concat(LCHLauncherRecipes);

const api = LCHAPIObjectFor(allRecipes);
const apiTypeEquivalenceMap = LCHAPITypeEquivalenceMapForRecipes(allRecipes);
const typeNameMap = LCHAPITypeNameMap(allRecipes);

import {
	LCHRecipesModelIsTask,
	LCHAPIExecuteRecipe,
} from './api.js';
(function StartRecipeTasks() {
	allRecipes.filter(function (e) {
		if (!LCHRecipesModelIsTask(e)) {
			return false;
		}

		if (!LCHLauncherPatternMatchesURL(e.LCHRecipeURLFilter, window.location.href)) {
			return false;
		}

		return true;
	}).forEach(function (e) {
		LCHLauncherExecuteRecipe(e, [], api);
	});
})();

async function LCHLauncherExecuteRecipe(param1, param2, param3) {
	if (param1.LCHRecipeStyle) {
		document.body.appendChild(document.createElement('style')).innerHTML = param1.LCHRecipeStyle;
	}

	return await LCHAPIExecuteRecipe(param1, param2, param3);
}

import {
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
			return secondaryComponent.set({
				LCHInstanceClass: apiComponents[inputData.LCHComponentDescriptorName],
				LCHInstanceOptions: Object.assign(inputData.LCHComponentDescriptorProps, {
					completionHandler: function () {
						secondaryComponent.set(null);
						mod.commandExit();
					},
					OLSKLocalized: inputData.LCHComponentDescriptorOLSKLocalized ? OLSKLocalized : undefined,
				}),
			});
		});
	})(inputData.LCHCompositionAction ? await LCHAPIExecuteComposition(inputData, api) : await LCHLauncherExecuteRecipe(inputData, [], api));
}

import {
	LCHRecipesModelIsCommand,
	LCHRecipesModelIsSubject,
	LCHRecipesModelIsAction,
} from './api.js';
import { LCHLauncherUIRecipesForMode } from './ui-logic.js';
let _PromptObjects = [];
let _PromptActiveIndex = 0;
let _AllPromptRecipes = LCHLauncherUIRecipesForMode(allRecipes, LRTOptions.runMode);
let _AllSubjects = _AllPromptRecipes.filter(function (e) {
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
let _AllActions = _AllPromptRecipes.filter(LCHRecipesModelIsAction);
let _ActionableTypesForPrimarySubject = Object.keys(apiTypeEquivalenceMap).filter(function (type) {
	return _AllActions.filter(function (e) {
		return LCHRecipeInputTypesForString(e.LCHRecipeInputTypes).shift() === type;
	}).length;
});

(function StartPromptObjects() {
	if (LRTOptions.runMode === LCHLauncherModePipe()) {
		 return _PromptObjects.push(...[{
			LCHPromptClass: 'LCHLauncherSubjectPrompt',
			LCHPromptHeading: OLSKLocalized('LCHLauncherSubjectPromptHeadingText'),
			LCHPromptItemsVisible: [],
			LCHPromptItemsAll: _AllSubjects.filter(function (e) {
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

	_PromptObjects.push({
		LCHPromptClass: 'LCHLauncherFilterPrompt',
		LCHPromptItemsVisible: [],
		LCHPromptItemsAll: _AllPromptRecipes,
		LCHPromptFilterText: '',
		LCHPromptResultsThrottle: false,
		LCHPromptIsVisible: true,
	 });

	if (LRTOptions.runMode !== LCHLauncherModePreview()) {
		return;
	}

	_PromptObjects[0].LCHPromptItemsVisible = _PromptObjects[0].LCHPromptItemsAll;
})();

import { LCHLauncherThrottleDuration } from './ui-logic.js';
import fuzzysort from 'fuzzysort';
function ActivePromptFilterTextShouldUpdate (inputData) {
	(function SetFilterText() {
		_PromptObjects[_PromptActiveIndex].LCHPromptFilterText = inputData;
	})();

	(function ClearFilterTextOnSubsequentPrompts() {
		for (var i = 0; i < _PromptObjects.length; i++) {
			if (!i) {
				continue;
			}

			if (i === _PromptActiveIndex) {
				continue;
			}

			_PromptObjects[i].LCHPromptFilterText = '';
			_PromptObjects[i].LCHPromptMatchStop = false;
		}
	})();

	(function SetMatchStop() {
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		if (_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle === false) {
			_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
		}
	})();

	(function ThrottleInput() {
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return;
		}

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(_PromptObjects[_PromptActiveIndex], 'LCHPromptInputThrottle', function (inputData) {
			return {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					_PromptObjects[inputData].LCHPromptInputThrottle = false;
				},
			};
		}, _PromptActiveIndex);
	})();

	(function ThrottleResults() {
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}
		
		if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return;
		}

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(_PromptObjects[_PromptActiveIndex], 'LCHPromptResultsThrottle', function (inputData) {
			return {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					_PromptObjects[inputData].LCHPromptResultsThrottle = false;
				},
			};
		}, _PromptActiveIndex);
	})();

	(function SetItems() {
		ActivePromptItemsShouldUpdate((function() {
			if (LRTOptions.runMode === LCHLauncherModePipe() && !_PromptObjects[_PromptActiveIndex].LCHPromptFilterText && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false) {
				return _PromptObjects[_PromptActiveIndex].LCHPromptItemsVisible;
			}
			
			if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				return LRTOptions.runMode === LCHLauncherModePreview() ? _PromptObjects[_PromptActiveIndex].LCHPromptItemsAll : [];
			}

			const visibleRecipes = _PromptObjects[_PromptActiveIndex].LCHPromptItemsAll.filter(function (e) {
				return e.LCHRecipeIsHidden ? !e.LCHRecipeIsHidden() : true;
			});

			let results = fuzzysort.go(_PromptObjects[_PromptActiveIndex].LCHPromptFilterText, visibleRecipes, {
				key: 'LCHRecipeName',
			});

			if (!results.length && _LCHIsTestingBehaviour() && !_PromptObjects[_PromptActiveIndex].LCHPromptFilterText.slice(0, 3).match(/[^A-Z]/)) {
				return visibleRecipes.filter(function (e) {
					return e.LCHRecipeSignature === _PromptObjects[_PromptActiveIndex].LCHPromptFilterText;
				});
			};

			if (LRTOptions.runMode === LCHLauncherModePipe() && _PromptObjects[_PromptActiveIndex].LCHPromptItemsVisible.length && !results.length) {
				if (_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
					OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
				}

				_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = true;

				return _PromptObjects[_PromptActiveIndex].LCHPromptItemsVisible;
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
		_PromptObjects[_PromptActiveIndex].LCHPromptItemsVisible = inputData;
	})();


	(function SetItemSelected() {
		ActivePromptItemSelectedShouldUpdate(_PromptObjects[_PromptActiveIndex].LCHPromptItemsVisible[0]);
	})();
}

import { LCHRecipesModelActionTakesObject, LCHRecipeInputTypesForString } from './api.js';
import { LCHLauncherActionComparator } from './ui-logic.js';
function ActivePromptItemSelectedShouldUpdate (inputData) {
	(function SetItemSelected() {
		_PromptObjects[_PromptActiveIndex].LCHPromptItemSelected = inputData;

		if (LRTOptions.runMode !== LCHLauncherModePreview()) {
			return;
		}

		apiStart(_PromptObjects[0].LCHPromptItemSelected);
	})();

	if (LRTOptions.runMode !== LCHLauncherModePipe()) {
		return;
	}

	(function UpdateActionsForSubject() {
		if (_PromptActiveIndex !== 0) {
			return;
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptItemSelected) {
			_PromptObjects[1].LCHPromptItemsVisible = _PromptObjects[1].LCHPromptItemsAll = [];
			delete _PromptObjects[1].LCHPromptItemSelected;

			return;
		}

		_PromptObjects[1].LCHPromptItemsAll = _AllActions.filter(function (e) {
			return apiTypeEquivalenceMap[inputData.LCHRecipeOutputType || 'Command'].filter(function (type) {
				return LCHRecipeInputTypesForString(e.LCHRecipeInputTypes).shift() === type;
			}).length;
		}).sort(LCHLauncherActionComparator(inputData.LCHRecipeOutputType || 'Command'));

		_PromptObjects[1].LCHPromptItemsVisible = _PromptObjects[1].LCHPromptItemsAll;

		_PromptObjects[1].LCHPromptItemSelected = _PromptObjects[1].LCHPromptItemsVisible[0];
	})();

	(function UpdateObjectsForAction() {
		if (_PromptActiveIndex > 1) {
			return;
		}

		if (!_PromptObjects[1].LCHPromptItemSelected) {
			return;
		}

		_PromptObjects[2].LCHPromptIsVisible = LCHRecipesModelActionTakesObject(_PromptObjects[1].LCHPromptItemSelected);

		_PromptObjects[2].LCHPromptItemsAll = !_PromptObjects[2].LCHPromptIsVisible || LCHRecipeInputTypesForString(_PromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop() === 'String' ? [] : _AllSubjects.filter(function (e) {
			return apiTypeEquivalenceMap[LCHRecipeInputTypesForString(_PromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop()].indexOf(e.LCHRecipeOutputType) !== -1;
		});

		_PromptObjects[2].LCHPromptItemsVisible = _PromptObjects[2].LCHPromptItemsAll;

		_PromptObjects[2].LCHPromptItemSelected = _PromptObjects[2].LCHPromptItemsVisible[0];
	})();
}

import OLSKThrottle from 'OLSKThrottle';

let rootElement;

let inputElement;
import { onMount } from 'svelte';
onMount(function () {
	if (LRTOptions.runMode === LCHLauncherModePipe()) {
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

	ValuePromptActiveIndex (inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptActiveIndex;
		}

		(function CancelThrottle() {
			if (LRTOptions.runMode !== LCHLauncherModePipe()) {
				return;
			}

			if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle)) {
				clearTimeout(_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle._OLSKThrottleTimeoutID);
			}
			
			_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle = undefined;

			if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle)) {
				clearTimeout(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID);
			}
			
			_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = undefined;
		})();

		if (!_PromptObjects[1].LCHPromptItemsAll.length) {
			return;
		}

		(function SetIndexActive() {
			_PromptActiveIndex = inputData;
		})();

		(function ActivateDotMode() {
			if (_PromptActiveIndex !== 2) {
				return;
			}

			if (LCHRecipeInputTypesForString(_PromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop() !== 'String') {
				return;
			}

			mod.ValuePromptDotModeEnabled(true);
			mod.ValuePromptDotModeText(mod.ValuePromptDotModeText());
		})();
	},
	ValuePromptDotModeEnabled (inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled;
		}

		_PromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled = inputData;
	},
	ValuePromptDotModeText(inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptObjects[_PromptActiveIndex].LCHPromptDotModeText;
		}

		_PromptObjects[_PromptActiveIndex].LCHPromptDotModeText = inputData;

		ActivePromptItemsShouldUpdate(_PromptObjects[_PromptActiveIndex].LCHPromptDotModeText ? [{
			LCHRecipeName: _PromptObjects[_PromptActiveIndex].LCHPromptDotModeText,
			LCHRecipeCallback () {
				return inputData;
			},
			LCHRecipeOutputType: LCHPrimitiveURLCallback(_PromptObjects[_PromptActiveIndex].LCHPromptDotModeText) ? 'URL' : 'String',
		}] : []);
	},
	ValuePromptResultsIsVisible (inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false;
		}

		_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = inputData ? false : undefined;
	},

	// DATA

	DataComposition () {
		if (LRTOptions.runMode === LCHLauncherModePipe()) {
			return {
				LCHCompositionAction: _PromptObjects[1].LCHPromptItemSelected,
				LCHCompositionSubjectPrimary: _PromptObjects[0].LCHPromptItemSelected,
				LCHCompositionSubjectSecondary: _PromptObjects[2].LCHPromptItemSelected,
			};
		}

		return {
			LCHCompositionAction: Object.assign(LCHRunCommandRecipe(), {
				LCHRecipeName: OLSKLocalized('LCHStandardRecipeNames')[LCHRunCommandRecipe().LCHRecipeSignature],
			}),
			LCHCompositionSubjectPrimary: _PromptObjects[0].LCHPromptItemSelected,
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
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		mod.ValuePromptActiveIndex(_PromptObjects.indexOf(inputData));
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

		if (LRTOptions.runMode === LCHLauncherModePipe() && mod.ValuePromptResultsIsVisible()) {
			return mod.ValuePromptResultsIsVisible(false);
		}

		if (LRTOptions.runMode !== LCHLauncherModePipe() && _PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return ActivePromptFilterTextShouldUpdate('');
		}

		mod.commandExit();
	},
	_commandHandleEventKeydownTab (event) {
		event.preventDefault();

		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		mod.ValuePromptActiveIndex(LCHLauncherConstrainIndex(_PromptObjects.filter(function (e) {
			return e.LCHPromptIsVisible;
		}), _PromptActiveIndex + (event.shiftKey ? -1 : 1) * (function () {
			if (!_PromptActiveIndex && _PromptObjects[2].LCHPromptIsVisible && _PromptObjects[1].LCHPromptItemsAll.length === 1) {
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
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (!mod.ValuePromptResultsIsVisible()) {
			return mod.ValuePromptResultsIsVisible(true);
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
			return;
		}

		OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
	},
	_commandHandleEventKeydownArrowDown (event) {
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === undefined) {
			_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = false;
			return;
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
			return;
		}

		OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
	},
	_commandHandleEventKeydownDot (event) {
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (_PromptActiveIndex !== 0) {
			return;
		}
		
		if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle)) {
			clearTimeout(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID);
		}

		mod.ValuePromptResultsIsVisible(false);
		mod.ValuePromptDotModeEnabled(true);
		ActivePromptFilterTextShouldUpdate('');
		mod.ValuePromptDotModeText(mod.ValuePromptDotModeText());

		if (mod.ValuePromptDotModeText()) {
			return;
		}

		_PromptObjects[1].LCHPromptItemsAll = [];
		_PromptObjects[1].LCHPromptItemsVisible = [];
		delete _PromptObjects[1].LCHPromptItemSelected;
	},
	_commandHandleEventKeydownBackspace (event) {
		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
			return ActivePromptFilterTextShouldUpdate(_PromptObjects[_PromptActiveIndex].LCHPromptFilterText.slice(0, -1));
		}

		if (_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
			return ActivePromptFilterTextShouldUpdate('');
		}

		ActivePromptItemsShouldUpdate([]);

		_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = undefined;

		_PromptObjects[_PromptActiveIndex].LCHPromptDotModeText = '';
	},
	commandHandleEventKeydown (event) {
		if (_PromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled && mod._commandHandleEventKeydownModeDotMode(event)) {
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

		if (_PromptObjects[_PromptActiveIndex].LCHPromptDotModeEnabled) {
			return;
		}

		if (LRTOptions.runMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (!LCHLauncherKeyboardEventIsTextInput(event)) {
			return;
		}

		ActivePromptFilterTextShouldUpdate(!_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle ? event.key : _PromptObjects[_PromptActiveIndex].LCHPromptFilterText + event.key);
	},
	commandReloadSubjects (inputData) {
		let reloadSubjects = LCHLauncherReloadableSubjects([inputData]);
		
		if (!reloadSubjects.length) {
			return false;
		};

		_PromptObjects[0].LCHPromptItemsVisible = [];
		_PromptObjects[0].LCHPromptItemsAll = reloadSubjects;

		mod.ValuePromptActiveIndex(0);

		ActivePromptItemSelectedShouldUpdate(reloadSubjects[0]);
		
		return true;
	},
	async commandTerminate () {
		if (LRTOptions.runMode === LCHLauncherModePipe()) {
			if (mod.commandReloadSubjects(await apiStart(mod.DataComposition()))) {
				return;
			};
		}

		if (LRTOptions.runMode === LCHLauncherModeCommit()) {
			await apiStart(_PromptObjects[0].LCHPromptItemSelected);
		}

		mod.commandExit();
	},
	commandExit () {
		if (typeof completionHandler !== 'function') {
			return;
		}

		return completionHandler();
	},
};
</script>
<svelte:window on:keydown={ mod.interfaceDidKeydown } on:click={ mod.interfaceDidClickBody } on:touchstart={ mod.interfaceDidClickBody }/>

<div class="Container LCHLauncher" bind:this={ rootElement }>

{#each _PromptObjects as e}

{#if e.LCHPromptIsVisible}

<div class={ e.LCHPromptClass } class:LCHLauncherPromptSelected={ _PromptObjects[_PromptActiveIndex] === e } on:click={ () => mod.interfaceDidClickPrompt(e) }>
	{#if LRTOptions.runMode === LCHLauncherModePipe()}
		<strong class="LCHLauncherPromptHeading" class:LCHLauncherPromptHeadingMatchStop={ e.LCHPromptMatchStop }>{ e.LCHPromptFilterText && e.LCHPromptFilterText.toUpperCase() || e.LCHPromptHeading }</strong>
	{/if}

	<LCHLauncherPrompt
		PromptItems={ e.LCHPromptItemsVisible }
		ItemSelected={ e.LCHPromptItemSelected }
		ItemSelectedHidden={ LRTOptions.runMode !== LCHLauncherModePipe() || e.LCHPromptDotModeEnabled }
		ResultsHidden={ e.LCHPromptResultsThrottle !== false }
		on:ResultListDispatchArrow={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) }
		on:ResultListDispatchClick={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) || mod.commandTerminate() }
		>
		{#if e.LCHPromptClass === 'LCHLauncherSubjectPrompt' && !e.LCHPromptDotModeEnabled }
			<span class="LCHLauncherSubjectPromptPlaceholder">{ OLSKLocalized('LCHLauncherSubjectPromptPlaceholderText') }</span>
		{/if}

		{#if e.LCHPromptClass === 'LCHLauncherFilterPrompt' }
			<input placeholder="{ LRTOptions.runMode === LCHLauncherModePreview() ? OLSKLocalized('LCHLauncherInputPlaceholderPreview') : OLSKLocalized('LCHLauncherInputPlaceholderDefault') }" bind:value={ _PromptObjects[0].LCHPromptFilterText } bind:this={ inputElement } on:input={ () => ActivePromptFilterTextShouldUpdate(inputElement.value) } id="LCHLauncherFilterInput" />
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
	<svelte:component this={ $secondaryComponent.LCHInstanceClass } {...$secondaryComponent.LCHInstanceOptions} />
{/if}

<style src="./ui-style.css"></style>
