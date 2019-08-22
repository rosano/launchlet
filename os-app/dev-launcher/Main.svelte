<script>
import { OLSKLocalized, OLSKFormatted } from './_shared.js';
import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

import LCHLauncherPrompt from './modules/LCHLauncherPrompt/main.svelte';
import LCHLauncherPipeItem from './modules/LCHLauncherPipeItem/main.svelte';

import {
	LCHOptionsObject,
	secondaryComponent,
} from './_shared.js';
import {
	LCHLauncherModePreview,
	LCHLauncherModePipe,
	// LCHLauncherFilterForText,
} from './ui-logic.js';

export let dataObjects = [];
export let completionHandler;
export let optionsObject = {};

(function StartSetup() {
	LCHOptionsObject(optionsObject);
})();

import { LCHLauncherPatternMatchesURL } from './ui-logic.js';
(function StartDiscardDataObjects() {
	dataObjects = dataObjects.filter(function (e) {
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
(function StartPageFormulas() {
	if (typeof window.LCHPageFormulas !== 'function') {
		return;
	}

	let pageFormulas = window.LCHPageFormulas();

	if (!Array.isArray(pageFormulas)) {
		return;
	}

	dataObjects.push(...pageFormulas.map(function (e) {
		delete e.LCHRecipeURLFilter;
		delete e.LCHRecipeIsAutomatic;
		
		return e;
	}).filter(function(e) {
		return !LCHRecipesModelErrorsFor(e);
	}));
})();

import {
	LCHAPIObjectFor,
	LCHLauncherConvertTypeServiceSearch,
	LCHAPITypeEquivalenceMapForRecipes,
} from './api.js';
import { LCHLauncherStandardRecipes } from './recipes/recipes.js';
const allRecipes = LCHLauncherStandardRecipes().concat(dataObjects);

const api = LCHAPIObjectFor(allRecipes);
const apiTypeEquivalenceMap = LCHAPITypeEquivalenceMapForRecipes(allRecipes);

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
import * as apiComponents from './recipes/components.js';
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
				}),
			});
		});
	})(inputData.LCHCompositionAction ? await LCHAPIExecuteComposition(inputData, api) : await LCHLauncherExecuteRecipe(inputData, [], api));
}

import {
	LCHRecipesModelIsSubject,
	LCHRecipesModelIsAction,
} from './api.js';
import { LCHLauncherUIRecipesForMode } from './ui-logic.js';
let _PromptObjects = [];
let _PromptActiveIndex = 0;
let _AllPromptRecipes = LCHLauncherUIRecipesForMode(allRecipes, LCHOptionsObject().runMode);
let _AllSubjects = _AllPromptRecipes.filter(LCHRecipesModelIsSubject).filter(function (e) {
	return !e.LCHRecipeOutputType || (Object.keys(apiTypeEquivalenceMap).indexOf(e.LCHRecipeOutputType) !== -1);
});
let _AllActions = _AllPromptRecipes.filter(LCHRecipesModelIsAction);
let _ActionableTypesForPrimarySubject = Object.keys(apiTypeEquivalenceMap).filter(function (type) {
	return _AllActions.filter(function (e) {
		return LCHRecipeInputTypesForString(e.LCHRecipeInputTypes).shift() === type;
	}).length;
});

(function StartPromptObjects() {
	if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
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
			LCHPromptTextItem: '',
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

	if (LCHOptionsObject().runMode !== LCHLauncherModePreview()) {
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
				continue
			};

			if (i === _PromptActiveIndex) {
				continue
			};

			_PromptObjects[i].LCHPromptFilterText = '';
			_PromptObjects[i].LCHPromptMatchStop = false;
		};
	})();

	(function SetMatchStop() {
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
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
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return;
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return;
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle) {
			_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle = {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle = false;
				},
			};	
		}

		OLSKThrottle.OLSKThrottleTimeoutFor(_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle);
	})();

	(function ThrottleResults() {
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return;
		}
		
		if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return;
		}

		if (!_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
			_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = false;
				},
			};	
		}

		OLSKThrottle.OLSKThrottleTimeoutFor(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
	})();

	(function SetItems() {
		ActivePromptItemsShouldUpdate((function() {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe() && !_PromptObjects[_PromptActiveIndex].LCHPromptFilterText && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false) {
				return _PromptObjects[_PromptActiveIndex].LCHPromptItemsVisible;
			}
			
			if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				return LCHOptionsObject().runMode === LCHLauncherModePreview() ? _PromptObjects[_PromptActiveIndex].LCHPromptItemsAll : [];
			}

			let results = fuzzysort.go(_PromptObjects[_PromptActiveIndex].LCHPromptFilterText, _PromptObjects[_PromptActiveIndex].LCHPromptItemsAll, {
				key: 'LCHRecipeName',
			});

			if (LCHOptionsObject().runMode === LCHLauncherModePipe() && _PromptObjects[_PromptActiveIndex].LCHPromptItemsVisible.length && !results.length) {
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

import { LCHRecipesModelActionTakesObject } from './api.js';
function ActivePromptItemSelectedShouldUpdate (inputData) {
	(function SetItemSelected() {
		_PromptObjects[_PromptActiveIndex].LCHPromptItemSelected = inputData;

		if (LCHOptionsObject().runMode !== LCHLauncherModePreview()) {
			return;
		}

		apiStart(_PromptObjects[0].LCHPromptItemSelected);
	})();

	if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
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
				return e.LCHRecipeInputTypes.indexOf(type) !== -1;
			}).length;
		});

		_PromptObjects[1].LCHPromptItemsVisible = _PromptObjects[1].LCHPromptItemsAll;

		_PromptObjects[1].LCHPromptItemSelected = _PromptObjects[1].LCHPromptItemsVisible[0];
	})();

	(function UpdateObjectsForAction() {
		if (_PromptActiveIndex !== 1) {
			return;
		}

		_PromptObjects[2].LCHPromptIsVisible = LCHRecipesModelActionTakesObject(_PromptObjects[_PromptActiveIndex].LCHPromptItemSelected);
	})();
}

let formulasDefault = LCHOptionsObject().runMode === LCHLauncherModePreview() ? dataObjects : [];
import OLSKThrottle from 'OLSKThrottle';

let rootElement;

let inputElement;
import { onMount } from 'svelte';
onMount(function () {
	if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
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

import { LCHLauncherKeyboardEventIsTextInput } from './ui-logic.js';
import { LCHCompositionModelErrors } from './api.js'
import { LCHRunCommandRecipe } from './recipes/LCHRunCommand/main.js';
const mod = {

	// VALUE

	ValuePromptActiveIndex (inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptActiveIndex;
		};

		(function CancelThrottle() {
			if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
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

		if (!_PromptObjects[inputData].LCHPromptItemsAll.length) {
			return;
		};

		(function SetIndexActive() {
			_PromptActiveIndex = inputData;
		})();
	},
	ValuePromptModeText (inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptObjects[_PromptActiveIndex].LCHPromptTextItemMode;
		};

		_PromptObjects[_PromptActiveIndex].LCHPromptTextItemMode = inputData;
	},
	ValuePromptTextItem(inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptObjects[_PromptActiveIndex].LCHPromptTextItem;
		};

		_PromptObjects[_PromptActiveIndex].LCHPromptTextItem = inputData;

		ActivePromptItemsShouldUpdate(_PromptObjects[_PromptActiveIndex].LCHPromptTextItem ? [{
			LCHRecipeName: _PromptObjects[_PromptActiveIndex].LCHPromptTextItem,
			LCHRecipeCallback () {
				return inputData;
			},
			LCHRecipeOutputType: 'String',
		}] : []);
	},
	ValuePromptResultsIsVisible (inputData) {
		if (typeof inputData === 'undefined') {
			return _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false;
		};

		_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = inputData ? false : undefined;
	},

	// DATA

	DataComposition () {
		if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
			return {
				LCHCompositionAction: _PromptObjects[1].LCHPromptItemSelected,
				LCHCompositionSubjectPrimary: _PromptObjects[0].LCHPromptItemSelected,
				LCHCompositionSubjectSecondary: _PromptObjects[2].LCHPromptItemSelected,
			};
		};

		return {
			LCHCompositionAction: LCHRunCommandRecipe(),
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
	interfaceDidKeydown (event) {
		mod.commandHandleEventKeydown(event);
	},

	// COMMAND
	
	_commandHandleEventKeydownModeTextItem (event) {
		const handlerFunctions = {
			Escape () {
				event.preventDefault();
				event.stopPropagation();

				return mod.ValuePromptModeText(false) || true;
			},
			Tab () {
				if (!mod.ValuePromptTextItem()) {
					return true;
				};
				
				return mod.ValuePromptModeText(false)
			},
			Enter () {
				return mod.ValuePromptModeText(false)
			},
		};

		if (!handlerFunctions[event.key]) {
			return true;
		};

		return handlerFunctions[event.key]()
	},
	_commandHandleEventKeydownEscape (event) {
		event.preventDefault();
		event.stopPropagation();

		if (LCHOptionsObject().runMode === LCHLauncherModePipe() && mod.ValuePromptResultsIsVisible()) {
			return mod.ValuePromptResultsIsVisible(false);
		}

		if (LCHOptionsObject().runMode !== LCHLauncherModePipe() && _PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
			return ActivePromptFilterTextShouldUpdate('');
		}

		mod.commandExit();
	},
	_commandHandleEventKeydownTab (event) {
		event.preventDefault();

		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return;
		}

		mod.ValuePromptActiveIndex(!_PromptActiveIndex ? 1 : 0);
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
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return
		};

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
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return
		};

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
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (_PromptActiveIndex === 1) {
			return;
		};
		
		if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle)) {
			clearTimeout(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID);
		}

		mod.ValuePromptResultsIsVisible(false);
		mod.ValuePromptModeText(true)
		ActivePromptFilterTextShouldUpdate('');
		mod.ValuePromptTextItem(mod.ValuePromptTextItem())

		if (mod.ValuePromptTextItem()) {
			return;
		};

		_PromptObjects[1].LCHPromptItemsAll = [];
		_PromptObjects[1].LCHPromptItemsVisible = [];
		delete _PromptObjects[1].LCHPromptItemSelected;
	},
	_commandHandleEventKeydownBackspace (event) {
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
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

		_PromptObjects[_PromptActiveIndex].LCHPromptTextItem = '';
	},
	commandHandleEventKeydown (event) {
		if (_PromptObjects[_PromptActiveIndex].LCHPromptTextItemMode && mod._commandHandleEventKeydownModeTextItem(event)) {
			return;
		};

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

		if (_PromptObjects[_PromptActiveIndex].LCHPromptTextItemMode) {
			return;
		};

		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return;
		}

		event.preventDefault();

		if (!LCHLauncherKeyboardEventIsTextInput(event)) {
			return;
		}

		ActivePromptFilterTextShouldUpdate(!_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle ? event.key : _PromptObjects[_PromptActiveIndex].LCHPromptFilterText + event.key);
	},
	async commandTerminate () {
		if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
			await apiStart(mod.DataComposition());
		}

		if (LCHOptionsObject().runMode !== LCHLauncherModePreview()) {
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
}
</script>
<svelte:window on:keydown={ mod.interfaceDidKeydown } on:click={ mod.interfaceDidClickBody } on:touchstart={ mod.interfaceDidClickBody }/>

<div class="Container" bind:this={ rootElement }>

<div class="Bezel">

{#each _PromptObjects as e}

{#if e.LCHPromptIsVisible}

<div class={ e.LCHPromptClass } class:LCHLauncherPromptSelected={ _PromptObjects[_PromptActiveIndex] === e } on:click={ () => mod.ValuePromptActiveIndex(_PromptObjects.indexOf(e) ) }>
	{#if LCHOptionsObject().runMode === LCHLauncherModePipe()}
		<strong class="LCHLauncherPromptHeading" class:LCHLauncherPromptHeadingMatchStop={ e.LCHPromptMatchStop }>{ e.LCHPromptFilterText && e.LCHPromptFilterText.toUpperCase() || e.LCHPromptHeading }</strong>
	{/if}

	<LCHLauncherPrompt PromptItems={ e.LCHPromptItemsVisible } on:ResultListDispatchArrow={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) } ItemSelected={ e.LCHPromptItemSelected } on:ResultListDispatchClick={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) || mod.commandTerminate() } ItemSelectedHidden={ LCHOptionsObject().runMode !== LCHLauncherModePipe() || e.LCHPromptTextItemMode } ResultsHidden={ e.LCHPromptResultsThrottle !== false }>
		{#if e.LCHPromptClass === 'LCHLauncherSubjectPrompt' && !e.LCHPromptTextItemMode }
			<span class="LCHLauncherSubjectPromptPlaceholder">{ OLSKLocalized('LCHLauncherSubjectPromptPlaceholderText') }</span>
		{/if}

		{#if e.LCHPromptClass === 'LCHLauncherFilterPrompt' }
			<input placeholder="{ LCHOptionsObject().runMode === LCHLauncherModePreview() ? OLSKLocalized('LCHLauncherInputPlaceholderPreview') : OLSKLocalized('LCHLauncherInputPlaceholderDefault') }" bind:value={ _PromptObjects[0].LCHPromptFilterText } bind:this={ inputElement } on:input={ () => ActivePromptFilterTextShouldUpdate(this.value) } id="LCHLauncherFilterInput" />
		{/if}

		{#if ['LCHLauncherFilterPrompt', 'LCHLauncherActionPrompt'].indexOf(e.LCHPromptClass) === -1 && e.LCHPromptTextItemMode }
			<input bind:value={ _PromptObjects[0].LCHPromptTextItem } on:input={ () => mod.ValuePromptTextItem(this.value) } class="LCHLauncherPromptTextItemInput" autofocus />
		{/if}
	</LCHLauncherPrompt>
</div>

{/if}

{/each}

</div>
	
{#if $secondaryComponent}
	<svelte:component this={ $secondaryComponent.LCHInstanceClass } {...$secondaryComponent.LCHInstanceOptions} />
{/if}

</div>

<style>
.Container {
	--__LaunchletWidth: 400px;
	--__LaunchletSharedPadding: 5px;

	width: var(--__LaunchletWidth);

	position: fixed;
	top: 0;
	left: 50%;
	margin: 0 0 0 calc(var(--__LaunchletWidth) / -2);
	z-index: 999999999;

	font-family: 'Lucida Grande', 'Helvetica', sans-serif;
	
	/*font-size: 16pt;*/
	color: black;

	/* CompensateExternalStyles */
	text-align: initial;
}

.Bezel {
	padding: var(--__LaunchletSharedPadding);
	border: 1px solid #cccccc;
	border-radius: 5px;
	box-shadow: 0 0 10px 0px #e6e6e6;

	background: #e6e6e6;

	/* __LaunchletBezelFlexboxParent */
	display: flex;
	flex-direction: column;
}

xxx .Container :global(.LCHLauncherZoneInput) {
	/* DisableTextSelection */
	pointer-events: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

xxx input {
	padding: 6px;
	border: 1px solid #cccccc;
	border-radius: 5px;

	background: #f3f3f3;
	color: #3f3f3f;

	/* BrowserDefaultOutline */
	outline: none;
}

input {
	border: none;

	background: none;
	color: #3f3f3f;

	/* BrowserDefaultOutline */
	outline: none;
}

.LCHLauncherPromptHeading {
	padding: 3px;

	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-size: 8pt;
	color: hsl(0, 0%, 60%);

	/* ContainerDivSpacingHotfix */
	display: block;
}

.LCHLauncherPromptHeadingMatchStop {
	color: #fd6666;
}

.Container :global(.LCHLauncherResultList) {
	width: 95%;
	padding-left: 5px;
	border-left: 1px solid hsl(0, 0%, 80%);

	margin: 5px;
	margin-right: none;

	color: black;

	/* @LCHLauncherResultListCapAndScroll */
	max-height: 165px;
	overflow-y: scroll;
}

.Container :global(.LCHLauncherResultListItem) {
	/* CapWidth */
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.LCHLauncherPromptSelected :global(.LCHLauncherZoneInputBezel), .LCHLauncherPromptSelected :global(.LCHLauncherResultListItemSelected) {
	background: hsl(0, 0%, 85%);
}

.LCHLauncherSubjectPromptPlaceholder {
	display: inline-block;

	font-size: 8pt;
	color: hsl(0, 0%, 20%);

	/* @LCHLauncherZoneInputBezelFlexbox:Child */
	align-self: center;
}

@media screen and (max-width: 760px) {

.Container {
	width: 100%;

	left: 0;
	margin: 0;
}

.Bezel {
	padding: 0;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid #cccccc;
}

input {
	width: 100%;
	padding: 10px;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid #cccccc;

	background: #f3f3f3;
	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-size: 16pt;
}

.Container :global(.LCHLauncherResultList) {
	width: 100%;
	padding-left: 0;
	border-left: none;

	margin: 0;

	/* @LCHLauncherResultListCapAndScroll */
	max-height: 220px;

  /* MobileSafariSmoothScrolling */
	-webkit-overflow-scrolling: touch;
}

.LCHLauncherPromptSelected :global(.LCHLauncherZoneInputBezel), .LCHLauncherPromptSelected :global(.LCHLauncherResultListItemSelected) {
	background: hsl(0, 0%, 80%);
}

}
</style>
