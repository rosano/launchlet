<script>
import { OLSKLocalized } from './_shared.js';
import { _LCHIsTestingBehaviour } from '../_shared/common/global.js';

import LCHLauncherPrompt from './modules/LCHLauncherPrompt/main.svelte';
import LCHLauncherPipeItem from './modules/LCHLauncherPipeItem/main.svelte';

import {
	LCHOptionsObject,
	formulaSelected,
	formulasVisible,
	actionsVisible,
	actionSelected,
	secondaryComponent,
} from './_shared.js';
import {
	LCHLauncherModeJump,
	LCHLauncherModePipe,
	LCHLauncherFilterForText,
} from './ui-logic.js';

export let dataObjects = [];
export let completionHandler;
export let optionsObject = {};

(function StartSetup() {
	LCHOptionsObject(optionsObject);
})();

import { LCHLauncherPatternMatchesURL } from './ui-logic.js';
(function StartFilterDataObjects() {
	dataObjects = dataObjects.filter(function (e) {
		return LCHLauncherPatternMatchesURL(e.LCHRecipeURLFilter || '', window.location.href);
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

	dataObjects.push(...pageFormulas.filter(function(e) {
		return !LCHRecipesModelErrorsFor(e);
	}));
})();

import {
	LCHAPIObjectFor,
	LCHAPITypeEquivalenceMapForRecipes,
} from './api.js';
import { LCHLauncherStandardRecipes } from './recipes/recipes.js';
const allRecipes = LCHLauncherStandardRecipes().concat(dataObjects);
const api = LCHAPIObjectFor(allRecipes);
const apiTypeEquivalenceMap = LCHAPITypeEquivalenceMapForRecipes(allRecipes)


import {
	LCHAPIExecuteComposition,
	LCHAPIExecuteRecipe,
	LCHComponentDescriptorsModelErrorsFor,
} from './api.js';
import * as apiComponents from './recipes/components.js';
async function apiStart(inputData) {
	return await (inputData.LCHCompositionAction ? LCHAPIExecuteComposition(inputData, api) : LCHAPIExecuteRecipe(inputData, [], api)).then(function (inputData) {
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
					},
				}),
			});
		});
	});
}

let _PromptObjects = [];
let _PromptActiveIndex = 0;
let _AllActions = allRecipes.filter(LCHRecipesModelIsVerb);
import {
	LCHRecipesModelIsSubject,
	LCHRecipesModelIsVerb,
} from './api.js';
(function StartPromptObjects() {
	 _PromptObjects.push(...[{
		LCHPromptClass: 'LCHLauncherSubjectPrompt',
		LCHPromptHeading: OLSKLocalized('LCHLauncherSubjectPromptHeadingText'),
		LCHPromptItems: [],
		LCHPromptItemsAll: allRecipes.filter(LCHRecipesModelIsSubject).filter(function (e) {
			return !e.LCHRecipeOutputType || (Object.keys(apiTypeEquivalenceMap).indexOf(e.LCHRecipeOutputType) !== -1);
		}),
		LCHPromptItemSelected: null,
		LCHPromptInputThrottle: undefined,
		LCHPromptFilterText: '',
		LCHPromptMatchStop: false,
		LCHPromptResultsThrottle: undefined,
	 }, {
		LCHPromptClass: 'LCHLauncherActionPrompt',
		LCHPromptHeading: OLSKLocalized('LCHLauncherActionPromptHeadingText'),
		LCHPromptItems: [],
		LCHPromptItemsAll: [],
		LCHPromptItemSelected: null,
		LCHPromptInputThrottle: undefined,
		LCHPromptFilterText: '',
		LCHPromptMatchStop: false,
		LCHPromptResultsThrottle: undefined,
	}]);
})();

import { LCHLauncherThrottleDuration } from './ui-logic.js';
function ActivePromptFilterTextShouldUpdate (inputData) {
	(function SetFilterText() {
		_PromptObjects[_PromptActiveIndex].LCHPromptFilterText = inputData;
	})();

	(function SetMatchStop() {
		if (_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle === false) {
			_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
		}
	})();

	(function ThrottleInput() {
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
			if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false) {
				return _PromptObjects[_PromptActiveIndex].LCHPromptItems;
			}
			
			if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				return [];
			}

			let results = _PromptObjects[_PromptActiveIndex].LCHPromptItemsAll.filter(LCHLauncherFilterForText(_PromptObjects[_PromptActiveIndex].LCHPromptFilterText));

			if (_PromptObjects[_PromptActiveIndex].LCHPromptItems.length && !results.length) {
				if (_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
					OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
				}

				_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = true;

				return _PromptObjects[_PromptActiveIndex].LCHPromptItems;
			}

			return results;
		})());
	})();
};

function ActivePromptItemsShouldUpdate (inputData) {
	(function SetItems() {
		_PromptObjects[_PromptActiveIndex].LCHPromptItems = inputData;
	})();


	(function SetItemSelected() {
		ActivePromptItemSelectedShouldUpdate(_PromptObjects[_PromptActiveIndex].LCHPromptItems[0]);
	})();
};

function ActivePromptItemSelectedShouldUpdate (inputData) {
	(function SetItemSelected() {
		_PromptObjects[_PromptActiveIndex].LCHPromptItemSelected = inputData;
	})();

	if (_PromptActiveIndex !== 0) {
		return;
	};

	(function UpdateActionsForSubject() {
		if (!_PromptObjects[_PromptActiveIndex].LCHPromptItemSelected) {
			_PromptObjects[1].LCHPromptItems = _PromptObjects[1].LCHPromptItemsAll = [];
			_PromptObjects[1].LCHPromptItemSelected = null;

			return;
		};

		_PromptObjects[1].LCHPromptItemsAll = _AllActions.filter(function (e) {
			return apiTypeEquivalenceMap[inputData.LCHRecipeOutputType || 'Command'].filter(function (type) {
				return e.LCHRecipeInputTypes.indexOf(type) !== -1
			}).length
		});

		_PromptObjects[1].LCHPromptItems = _PromptObjects[1].LCHPromptItemsAll;

		_PromptObjects[1].LCHPromptItemSelected = _PromptObjects[1].LCHPromptItems[0];
	})();
};

function ActivePromptIndexShouldUpdate (inputData) {
	(function CancelThrottle() {
		if (OLSKThrottle.OLSKThrottleInputDataIsThrottleObject(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle)) {
			clearTimeout(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
		}
		
		_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = undefined;
	})();

	(function SetIndexActive() {
		_PromptActiveIndex = _PromptObjects[0].LCHPromptFilterText ? inputData : 0;
	})();
};

function CompositionIsValid () {
	return !_PromptObjects.filter(function (e) {
		return !e.LCHPromptItemSelected;
	}).length;
};

let filterText = '';
let formulasDefault = LCHOptionsObject().runMode === LCHLauncherModeJump ? dataObjects : [];
import OLSKThrottle from 'OLSKThrottle';
if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
	formulaSelected.subscribe(function formulaSelectedDidChange(val) {
		return actionsVisible.set(!val ? [] : allRecipes.filter(function (e) {
			if (!LCHRecipesModelIsVerb(e)) {
				return false;
			}

			if (!apiTypeEquivalenceMap[val.LCHRecipeOutputType].filter(function (type) {
				return e.LCHRecipeInputTypes.indexOf(type) !== -1
			}).length) {
				return false;
			}

			return true;
		}));
	});

	actionsVisible.subscribe(function actionsVisibleDidChange(val) {
		return actionSelected.set(val[0]);
	});
}

let filterTextDidChange = function (val) {
	formulasVisible.update(function(currentValue) {
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
			return !val ? formulasDefault : dataObjects.filter(LCHLauncherFilterForText(val));
		}
		
		if (!val && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false) {
			return currentValue;
		}
		
		if (!val) {
			return [];
		}

		let results = dataObjects.filter(LCHRecipesModelIsSubject).filter(LCHLauncherFilterForText(val));

		if (currentValue.length && !results.length) {
			if (_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
				OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
			}

			_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = true;

			return currentValue;
		}

		return results;
	});

	formulaSelected.set((function() {
		if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
			return $formulasVisible[0];
		}

		return !val ? null : $formulasVisible[0];
	})());

	if (LCHOptionsObject().runMode !== LCHLauncherModeJump) {
		return;
	}

	if (!val) {
		return;
	}

	apiStart($formulaSelected);
};
$: filterTextDidChange(filterText.trim());

let rootElement;

let inputElement;
import { onMount } from 'svelte';
onMount(function () {
	if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
		return;
	}
	
	inputElement.focus();
});

import { afterUpdate } from 'svelte';
afterUpdate(function () {
	if (_LCHIsTestingBehaviour()) {
		return;
	}

	/* @CapAndScroll */
	let element = document.querySelector('.LCHLauncherResultListItemSelected');

	if (!element) {
		return;
	}

	element.scrollIntoView({
		block: 'nearest',
		inline: 'nearest',
	});
});

function handleDidFinish() {
	if (typeof completionHandler !== 'function') {
		return;
	}

	return completionHandler();
}

import {
	LCHLauncherKeyboardEventIsTextInput,
	LCHLauncherConstrainIndex,
} from './ui-logic.js';
function handleKeydown(event) {
	const handlerFunctions = {
		Escape () {
			if (!filterText) {
				handleDidFinish();
			}

			if (filterText) {
				filterText = '';
			}

			return event.preventDefault();
		},
		Tab () {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
				ActivePromptIndexShouldUpdate(!_PromptActiveIndex ? 1 : 0);
			}

			return event.preventDefault();
		},
		ArrowUp () {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
				return OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
			}

			formulaSelected.set($formulasVisible[LCHLauncherConstrainIndex($formulasVisible, $formulasVisible.indexOf($formulaSelected) - 1)]);

			if (LCHOptionsObject().runMode === LCHLauncherModeJump) {
				apiStart($formulaSelected);
			}

			return event.preventDefault();
		},
		ArrowDown () {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
				return OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
			}

			formulaSelected.set($formulasVisible[LCHLauncherConstrainIndex($formulasVisible, $formulasVisible.indexOf($formulaSelected) + 1)]);
			
			if (LCHOptionsObject().runMode === LCHLauncherModeJump) {
				apiStart($formulaSelected);
			}

			return event.preventDefault();
		},
		async Enter () {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
				if (!CompositionIsValid()) {
					return;
				};

				await apiStart({
					LCHCompositionAction: _PromptObjects[1].LCHPromptItemSelected,
					LCHCompositionSubjectPrimary: _PromptObjects[0].LCHPromptItemSelected,
				});
			} else if (LCHOptionsObject().runMode !== LCHLauncherModeJump) {
				await apiStart($formulaSelected);
			}

			handleDidFinish();

			return event.preventDefault();
		},
		Backspace () {
			if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
				return ActivePromptFilterTextShouldUpdate(filterText.slice(0, -1));
			}

			if (_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
				return ActivePromptFilterTextShouldUpdate(_PromptObjects[_PromptActiveIndex].LCHPromptFilterText.slice(0, -1));
			}

			if (_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
				return ActivePromptFilterTextShouldUpdate('');
			}

			ActivePromptItemsShouldUpdate([]);

			_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle = undefined;
			formulaSelected.set(null);
			formulasVisible.set([]);
		},
	};

	if (Object.keys(handlerFunctions).indexOf(event.code) !== -1) {
		return handlerFunctions[event.code]();
	}

	if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
		return;
	}

	if (!LCHLauncherKeyboardEventIsTextInput(event)) {
		return;
	}

	ActivePromptFilterTextShouldUpdate(_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle === false ? event.key : _PromptObjects[_PromptActiveIndex].LCHPromptFilterText + event.key);
}

function handleClick(event) { 
	if (rootElement.contains(event.target)) {
  	return;
	}

	handleDidFinish();
}

async function itemDidClick(event, item) {
	await apiStart(item);

	handleDidFinish();
}
</script>
<svelte:window on:keydown={ handleKeydown } on:click={ handleClick } on:touchstart={ handleClick }/>

<div class="Container" bind:this={ rootElement }>
	<div class="Bezel">
		{#if LCHOptionsObject().runMode !== LCHLauncherModePipe }
			<input placeholder="{ LCHOptionsObject().runMode === LCHLauncherModeJump ? OLSKLocalized('LCHLauncherInputPlaceholderJump') : OLSKLocalized('LCHLauncherInputPlaceholderDefault') }" bind:value={ filterText } bind:this={ inputElement } id="LCHLauncherFilterInput" />

			{#if $formulasVisible.length }
			<div class="ListContainer">
				{#each $formulasVisible as e}
					<div class="ListItem" class:ListItemSelected={ e === $formulaSelected } on:mouseover={ () => formulaSelected.set(e) } on:click={ (event) => itemDidClick(event, e) }>{ e.LCHRecipeTitle }</div>
				{/each}
			</div>
			{/if}
		{/if}

		{#if LCHOptionsObject().runMode === LCHLauncherModePipe }
			{#each _PromptObjects as e}
				<div class={ e.LCHPromptClass } class:LCHLauncherPromptSelected={ _PromptObjects[_PromptActiveIndex] === e } on:click={ () => ActivePromptIndexShouldUpdate(_PromptObjects.indexOf(e) ) }>
					<strong class="LCHLauncherPromptHeading" class:LCHLauncherPromptHeadingMatchStop={ e.LCHPromptMatchStop }>{ e.LCHPromptFilterText && e.LCHPromptFilterText.toUpperCase() || e.LCHPromptHeading }</strong>

					<LCHLauncherPrompt PromptItems={ e.LCHPromptItems } on:ItemSelectedDidChange={ (event) => e.LCHPromptItemSelected = event.detail } ItemSelected={ e.LCHPromptItemSelected } ResultsHidden={ e.LCHPromptResultsThrottle !== false }>
						{#if e.LCHPromptClass === 'LCHLauncherSubjectPrompt' }
							<span class="LCHLauncherSubjectPromptPlaceholder">{ OLSKLocalized('LCHLauncherSubjectPromptPlaceholderText') }</span>
						{/if}
					</LCHLauncherPrompt>
				</div>
			{/each}
		{/if}
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
	z-index: 9999;

	font-family: 'Lucida Grande', 'Helvetica', sans-serif;
	
	/*font-size: 16pt;*/
	color: black;

	/* CompensateExternalStyles */
	text-align: initial;
}

.Container :global(.LCHLauncherZoneInput) {
	/* DisableTextSelection */
	pointer-events: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
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
	border-left: 1px solid hsl(0, 0%, 80%);

	margin: 5px;
	margin-left: 4%;
	margin-right: none;

	color: black;

	/* @CapAndScroll */
	max-height: 80px;
	overflow-y: scroll;
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

input {
	padding: 6px;
	border: 1px solid #cccccc;
	border-radius: 5px;

	background: #f3f3f3;
	color: #3f3f3f;

	/* BrowserDefaultOutline */
	outline: none;
}

.ListContainer {
	margin-top: 10px;

	font-size: 13.5pt;

	/* @CapHeight */
	max-height: 165px;
	overflow: scroll;
}

.ListItem {
	padding: 5px;

	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-weight: bold;

	/* Behaviour */
	cursor: pointer;

	/* CapWidth */
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.ListItemSelected {
	background: #cccccc;
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
	padding: 10px;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid #cccccc;
}

.ListContainer {
	margin-top: 0;

	/* @CapHeight */
	max-height: 220px;

  /* MobileSafariSmoothScrolling */
	-webkit-overflow-scrolling: touch;
}

.ListItem {
	padding: 10px;
}

}
</style>
