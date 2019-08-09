<script>
import {
	OLSKLocalized,
	_LCHIsTestingBehaviour,
} from '../_shared/common/global.js';

import LCHLauncherZoneInput from './modules/LCHLauncherZoneInput/main.svelte';
import LCHLauncherPipeItem from './modules/LCHLauncherPipeItem/main.svelte';
import {
	LCHOptionsObject,
	formulaSelected,
	formulasVisible,
	actionsVisible,
	actionSelected,
	secondaryComponent,
} from './_shared.js';
import { LCHLauncherStandardRecipes } from './recipes/recipes.js';
import {
	LCHLauncherModeJump,
	LCHLauncherModePipe,
	LCHLauncherFilterForText,
	LCHLauncherThrottleDuration,
	LCHLauncherConstrainIndex,
	LCHLauncherPatternMatchesURL,
	LCHLauncherKeyboardEventIsTextInput,
} from './ui-logic.js';
import {
	LCHRecipesModelErrorsFor,
	LCHRecipesModelIsSubject,
	LCHRecipesModelIsVerb,
	LCHComponentDescriptorsModelErrorsFor,
	LCHAPITypeEquivalenceMapForRecipes
} from './api.js';

export let dataObjects = [];
export let completionHandler;
export let optionsObject = {};

(function StartSetup() {
	LCHOptionsObject(optionsObject);
})();

(function StartFilterDataObjects() {
	dataObjects = dataObjects.filter(function (e) {
		return LCHLauncherPatternMatchesURL(e.LCHRecipeURLFilter || '', window.location.href);
	});
})();

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

import { LCHAPIObjectFor } from './api.js';
import * as apiComponents from './recipes/components.js';
const allRecipes = LCHLauncherStandardRecipes().concat(dataObjects);
const api = LCHAPIObjectFor(allRecipes);
const apiTypeEquivalenceMap = LCHAPITypeEquivalenceMapForRecipes(allRecipes)

async function apiStart(inputData) {
	return Promise.resolve(inputData.LCHRecipeCallback.bind({
		api: api,
	})()).then(function (inputData) {
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

let filterText = '';
let formulasDefault = LCHOptionsObject().runMode === LCHLauncherModeJump() ? dataObjects : [];
import OLSKThrottle from 'OLSKThrottle';
let resultListThrottle, inputThrottle;
let matchStop;
if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
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
		if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
			return !val ? formulasDefault : dataObjects.filter(LCHLauncherFilterForText(val));
		}
		
		if (!val && resultListThrottle === false) {
			return currentValue;
		}
		
		if (!val) {
			return [];
		}

		let results = dataObjects.filter(LCHRecipesModelIsSubject).filter(LCHLauncherFilterForText(val));

		if (currentValue.length && !results.length) {
			if (resultListThrottle) {
				OLSKThrottle.OLSKThrottleSkip(resultListThrottle);
			}

			matchStop = true;

			return currentValue;
		}

		return results;
	});

	formulaSelected.set((function() {
		if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
			return $formulasVisible[0];
		}

		return !val ? null : $formulasVisible[0];
	})());

	if (LCHOptionsObject().runMode !== LCHLauncherModeJump()) {
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
	if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
		return;
	}
	
	inputElement.focus();
});

import { afterUpdate } from 'svelte';
afterUpdate(function () {
	if (_LCHIsTestingBehaviour()) {
		return;
	}

	let element = document.querySelector('.ListItemSelected');

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

let selectedZone = 'LCHLauncherSubjectZoneInput';
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
			if (LCHOptionsObject().runMode === LCHLauncherModePipe()) {
				(function() {
					if (selectedZone === 'LCHLauncherSubjectZoneInput') {
						selectedZone = 'LCHLauncherActionZoneInput';
						return;
					}

					selectedZone = 'LCHLauncherSubjectZoneInput';
				})();
			}

			return event.preventDefault();
		},
		ArrowUp () {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe() && resultListThrottle) {
				return OLSKThrottle.OLSKThrottleSkip(resultListThrottle);
			}

			formulaSelected.set($formulasVisible[LCHLauncherConstrainIndex($formulasVisible, $formulasVisible.indexOf($formulaSelected) - 1)]);

			if (LCHOptionsObject().runMode === LCHLauncherModeJump()) {
				apiStart($formulaSelected);
			}

			return event.preventDefault();
		},
		ArrowDown () {
			if (LCHOptionsObject().runMode === LCHLauncherModePipe() && resultListThrottle) {
				return OLSKThrottle.OLSKThrottleSkip(resultListThrottle);
			}

			formulaSelected.set($formulasVisible[LCHLauncherConstrainIndex($formulasVisible, $formulasVisible.indexOf($formulaSelected) + 1)]);
			
			if (LCHOptionsObject().runMode === LCHLauncherModeJump()) {
				apiStart($formulaSelected);
			}

			return event.preventDefault();
		},
		async Enter () {
			if (LCHOptionsObject().runMode !== LCHLauncherModeJump()) {
				await apiStart($formulaSelected);
			}

			handleDidFinish();

			return event.preventDefault();
		},
		Backspace () {
			if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
				filterText = filterText.slice(0, -1);
				return;
			}

			if (resultListThrottle !== false) {
				filterText = filterText.slice(0, -1);
				return;
			}

			if (filterText) {
				filterText = '';
				matchStop = false;

				return;
			}

			resultListThrottle = undefined;
			formulaSelected.set(null);
			formulasVisible.set([]);
		},
	};

	if (Object.keys(handlerFunctions).indexOf(event.code) !== -1) {
		return handlerFunctions[event.code]();
	}

	if (LCHOptionsObject().runMode !== LCHLauncherModePipe()) {
		return;
	}

	if (!LCHLauncherKeyboardEventIsTextInput(event)) {
		return;
	}

	filterText = inputThrottle === false ? event.key : filterText + event.key;

	if (inputThrottle === false) {
		matchStop = false;
	}

	(function ThrottleInput() {
		if (!inputThrottle) {
			inputThrottle = {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					inputThrottle = false;
				},
			};	
		}

		OLSKThrottle.OLSKThrottleTimeoutFor(inputThrottle);
	})();

	(function ThrottleResults() {
		if (!resultListThrottle) {
			resultListThrottle = {
				OLSKThrottleDuration: LCHLauncherThrottleDuration,
				OLSKThrottleCallback: function () {
					resultListThrottle = false;
				},
			};	
		}

		OLSKThrottle.OLSKThrottleTimeoutFor(resultListThrottle);
	})();
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
<!-- Bind to window to avoit triggering external events on page -->
<svelte:window on:keydown={ handleKeydown } on:click={ handleClick } on:touchstart={ handleClick }/>

<div class="Container" bind:this={ rootElement }>
	<div class="Bezel">
		{#if LCHOptionsObject().runMode !== LCHLauncherModePipe() }
			<input placeholder="{ LCHOptionsObject().runMode === LCHLauncherModeJump() ? OLSKLocalized('LCHLauncherInputPlaceholderJump') : OLSKLocalized('LCHLauncherInputPlaceholderDefault') }" bind:value={ filterText } bind:this={ inputElement } id="LCHLauncherFilterInput" />

			{#if $formulasVisible.length }
			<div class="ListContainer">
				{#each $formulasVisible as e}
					<div class="ListItem" class:ListItemSelected={ e === $formulaSelected } on:mouseover={ () => formulaSelected.set(e) } on:click={ (event) => itemDidClick(event, e) }>{ e.LCHRecipeTitle }</div>
				{/each}
			</div>
			{/if}
		{/if}

		{#if LCHOptionsObject().runMode === LCHLauncherModePipe() }
			<div class="LCHLauncherSubjectZoneInput" class:LCHLauncherZoneSelected={ selectedZone === 'LCHLauncherSubjectZoneInput' }>
				{#if $formulasVisible.length}
					<LCHLauncherZoneInput HeadingText={ OLSKLocalized('LCHLauncherZoneInputHeadingSubject') } FilterText={ filterText } MatchStop={ matchStop }>
						<LCHLauncherPipeItem itemTitle={ $formulaSelected.LCHRecipeTitle } />
					</LCHLauncherZoneInput>
				{:else}
					<LCHLauncherZoneInput HeadingText={ OLSKLocalized('LCHLauncherZoneInputHeadingSubject') } FilterText={ filterText } />
				{/if}
			</div>

			{#if LCHOptionsObject().runMode === LCHLauncherModePipe() && resultListThrottle === false }
				{#if $formulasVisible.length}
					<div class="LCHLauncherResultList">
						{#each $formulasVisible as e}
							<div class="LCHLauncherResultListItem" class:LCHLauncherResultListItemSelected={ e === $formulaSelected }>
								<LCHLauncherPipeItem itemTitle={ e.LCHRecipeTitle } />
							</div>
						{/each}
					</div>
				{/if}
			{/if}

			<div class="LCHLauncherActionZoneInput" class:LCHLauncherZoneSelected={ selectedZone === 'LCHLauncherActionZoneInput' }>
				<LCHLauncherZoneInput HeadingText={ OLSKLocalized('LCHLauncherZoneInputHeadingAction') }>
					{#if $actionSelected}
						<LCHLauncherPipeItem itemTitle={ $actionSelected.LCHRecipeTitle } />
					{/if}
				</LCHLauncherZoneInput>
			</div>
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

	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-size: 16pt;
	color: black;

	/* CompensateExternalStyles */
	text-align: initial;
}

.LCHLauncherResultList {
	width: 95%;
	border: 1px solid hsl(0, 0%, 80%);
	border-radius: 5px 0 0 5px;

	margin: 5px;
	margin-left: 4%;
	margin-right: none;

	background: hsl(0, 0%, 95%);
}

.LCHLauncherResultListItemSelected {
	background: #bcdaff;
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

.LCHLauncherZoneSelected :global(.LCHLauncherZoneInputBezel) {
	background: #bcdaff;
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
