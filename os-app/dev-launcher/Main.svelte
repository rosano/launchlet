<script>
import { OLSKLocalized } from './_shared.js';
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
(function StartFilterDataObjects() {
	dataObjects = dataObjects.filter(function (e) {
		if (e.LCHRecipeURLFilter && !LCHLauncherPatternMatchesURL(e.LCHRecipeURLFilter, window.location.href)) {
			return false;
		};
		
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
	LCHAPITypeEquivalenceMapForRecipes,
} from './api.js';
import { LCHLauncherStandardRecipes } from './recipes/recipes.js';
const allRecipes = LCHLauncherStandardRecipes().concat(dataObjects);
const api = Object.assign(LCHAPIObjectFor(allRecipes), {
	_LCHAPIExecuteRecipePrior (inputData) {
		if (!inputData.LCHRecipeStyle) {
			return;
		};
		
		document.body.appendChild(document.createElement('style')).innerHTML = inputData.LCHRecipeStyle;
	},
});
const apiTypeEquivalenceMap = LCHAPITypeEquivalenceMapForRecipes(allRecipes);

import {
	LCHRecipesModelIsTask,
	LCHAPIExecuteRecipe,
} from './api.js';
(function StartRecipeTasks() {
	allRecipes.filter(function (e) {
		if (!LCHRecipesModelIsTask(e)) {
			return false;
		};

		if (!LCHLauncherPatternMatchesURL(e.LCHRecipeURLFilter, window.location.href)) {
			return false;
		};

		return true;
	}).forEach(function (e) {
		LCHAPIExecuteRecipe(e, [], api);
	});
})();

import {
	LCHAPIExecuteComposition,
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
						handleDidFinish();
					},
				}),
			});
		});
	});
}

let _PromptObjects = [];
let _PromptActiveIndex = 0;
let _AllActions = allRecipes.filter(LCHRecipesModelIsAction);
import {
	LCHRecipesModelIsSubject,
	LCHRecipesModelIsAction,
	LCHRecipesModelIsCommand,
} from './api.js';
(function StartPromptObjects() {
	if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
		 return _PromptObjects.push(...[{
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
	};

	_PromptObjects.push({
		LCHPromptClass: 'LCHLauncherFilterPrompt',
		LCHPromptItems: [],
		LCHPromptItemsAll: allRecipes.filter(LCHRecipesModelIsCommand),
		LCHPromptFilterText: '',
		LCHPromptResultsThrottle: false,
	 });

	if (LCHOptionsObject().runMode !== LCHLauncherModePreview) {
		return;
	};

	_PromptObjects[0].LCHPromptItems = _PromptObjects[0].LCHPromptItemsAll;
})();

import { LCHLauncherThrottleDuration } from './ui-logic.js';
import fuzzysort from 'fuzzysort';
function ActivePromptFilterTextShouldUpdate (inputData) {
	(function SetFilterText() {
		_PromptObjects[_PromptActiveIndex].LCHPromptFilterText = inputData;
	})();

	(function SetMatchStop() {
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
			return;
		};

		if (_PromptObjects[_PromptActiveIndex].LCHPromptInputThrottle === false) {
			_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = false;
		}
	})();

	(function ThrottleInput() {
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
			return;
		};

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
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
			return;
		};
		
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
			if (LCHOptionsObject().runMode === LCHLauncherModePipe && !_PromptObjects[_PromptActiveIndex].LCHPromptFilterText && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle === false) {
				return _PromptObjects[_PromptActiveIndex].LCHPromptItems;
			}
			
			if (!_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				return LCHOptionsObject().runMode === LCHLauncherModePreview ? _PromptObjects[_PromptActiveIndex].LCHPromptItemsAll : [];
			}

			let results = fuzzysort.go(_PromptObjects[_PromptActiveIndex].LCHPromptFilterText, _PromptObjects[_PromptActiveIndex].LCHPromptItemsAll, {
				key: 'LCHRecipeName',
			});

			if (LCHOptionsObject().runMode === LCHLauncherModePipe && _PromptObjects[_PromptActiveIndex].LCHPromptItems.length && !results.length) {
				if (_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
					OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
				}

				_PromptObjects[_PromptActiveIndex].LCHPromptMatchStop = true;

				return _PromptObjects[_PromptActiveIndex].LCHPromptItems;
			}

			return results.sort(function (a, b) {
				return a.score < b.score ? 1 : (a.score > b.score ? -1 : 0);
			}).map(function (e) {
				return e.obj;
			});
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

		if (LCHOptionsObject().runMode !== LCHLauncherModePreview) {
			return;
		};

		apiStart(_PromptObjects[0].LCHPromptItemSelected);
	})();

	if (_PromptActiveIndex !== 0) {
		return;
	};

	(function UpdateActionsForSubject() {
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
			return;
		};

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
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
			return;
		}

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

async function LauncherShouldTerminate () {
	if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
		await apiStart({
			LCHCompositionAction: _PromptObjects[1].LCHPromptItemSelected,
			LCHCompositionSubjectPrimary: _PromptObjects[0].LCHPromptItemSelected,
		});
	}

	if (LCHOptionsObject().runMode !== LCHLauncherModePreview) {
		await apiStart(_PromptObjects[0].LCHPromptItemSelected);
	};

	handleDidFinish();
};

let formulasDefault = LCHOptionsObject().runMode === LCHLauncherModePreview ? dataObjects : [];
import OLSKThrottle from 'OLSKThrottle';

let rootElement;

let inputElement;
import { onMount } from 'svelte';
onMount(function () {
	if (LCHOptionsObject().runMode === LCHLauncherModePipe) {
		return;
	}
	
	setTimeout(function () {
		inputElement.focus();
	})
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
			if (LCHOptionsObject().runMode === LCHLauncherModePipe || !_PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				handleDidFinish();
			}

			if (LCHOptionsObject().runMode !== LCHLauncherModePipe && _PromptObjects[_PromptActiveIndex].LCHPromptFilterText) {
				ActivePromptFilterTextShouldUpdate('')
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
			return event.preventDefault();
		},
		ArrowDown () {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe && _PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle) {
				return OLSKThrottle.OLSKThrottleSkip(_PromptObjects[_PromptActiveIndex].LCHPromptResultsThrottle);
			}
			return event.preventDefault();
		},
		Enter () {
			if (CompositionIsValid()) {
				LauncherShouldTerminate();
			};

			return event.preventDefault();
		},
		Backspace () {
			if (LCHOptionsObject().runMode !== LCHLauncherModePipe) {
				return;
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
		{#each _PromptObjects as e}
			<div class={ e.LCHPromptClass } class:LCHLauncherPromptSelected={ _PromptObjects[_PromptActiveIndex] === e } on:click={ () => ActivePromptIndexShouldUpdate(_PromptObjects.indexOf(e) ) }>
				{#if LCHOptionsObject().runMode === LCHLauncherModePipe}
					<strong class="LCHLauncherPromptHeading" class:LCHLauncherPromptHeadingMatchStop={ e.LCHPromptMatchStop }>{ e.LCHPromptFilterText && e.LCHPromptFilterText.toUpperCase() || e.LCHPromptHeading }</strong>
				{/if}

				<LCHLauncherPrompt PromptItems={ e.LCHPromptItems } on:ResultListDispatchArrow={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) } ItemSelected={ e.LCHPromptItemSelected } on:ResultListDispatchClick={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) || LauncherShouldTerminate() } ItemSelectedHidden={ LCHOptionsObject().runMode !== LCHLauncherModePipe } ResultsHidden={ e.LCHPromptResultsThrottle !== false }>
					{#if e.LCHPromptClass === 'LCHLauncherSubjectPrompt' }
						<span class="LCHLauncherSubjectPromptPlaceholder">{ OLSKLocalized('LCHLauncherSubjectPromptPlaceholderText') }</span>
					{/if}

					{#if e.LCHPromptClass === 'LCHLauncherFilterPrompt' }
						<input placeholder="{ LCHOptionsObject().runMode === LCHLauncherModePreview ? OLSKLocalized('LCHLauncherInputPlaceholderPreview') : OLSKLocalized('LCHLauncherInputPlaceholderDefault') }" bind:value={ _PromptObjects[0].LCHPromptFilterText } bind:this={ inputElement } on:input={ () => ActivePromptFilterTextShouldUpdate(this.value) } id="LCHLauncherFilterInput" />
					{/if}
				</LCHLauncherPrompt>
			</div>
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

xxx .Container :global(.LCHLauncherZoneInput) {
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
	padding-left: 5px;
	border-left: 1px solid hsl(0, 0%, 80%);

	margin: 5px;
	margin-right: none;

	color: black;

	/* @CapAndScroll */
	max-height: 80px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
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

.ListContainer {
	margin-top: 10px;

	font-size: 13.5pt;

	/* @CapHeight */
	max-height: 165px;
	overflow: scroll;
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

.Container :global(.LCHLauncherResultList) {
	width: 100%;
	padding-left: 0;
	border-left: none;

	margin: 0;
}

.LCHLauncherPromptSelected :global(.LCHLauncherZoneInputBezel), .LCHLauncherPromptSelected :global(.LCHLauncherResultListItemSelected) {
	background: hsl(0, 0%, 80%);
}

}
</style>
