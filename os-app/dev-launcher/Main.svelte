<script>
import { LCHOptionsObject, OLSKLocalized, formulaSelected } from './_shared.js';
import { LCHLauncherModeJump, LCHLauncherLogicFilter, LCHLauncherLogicConstrainIndex } from './ui-logic.js';
import { LCHRecipesModelErrorsFor } from './api.js';

export let dataObjects = [];
export let completionHandler;
export let optionsObject = {};

(function StartSetup() {
	LCHOptionsObject(optionsObject);
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
const api = LCHAPIObjectFor(dataObjects);

function apiStart(inputData) {
	inputData.LCHRecipeCallback.bind({
		api: api,
	})();
};

let filterText = '';
let formulasVisible = [];
let formulasDefault = LCHOptionsObject().runMode === LCHLauncherModeJump ? dataObjects : [];
let filterTextDidChange = function (val) {
	formulasVisible = !val ? formulasDefault : dataObjects.filter(LCHLauncherLogicFilter(val));

	formulaSelected.set(!val ? null : formulasVisible[0]);

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
	inputElement.focus();
});

function handleDidFinish() {
	if (typeof completionHandler !== 'function') {
		return;
	}

	return completionHandler();
}

function handleKeydown(event) {
	const handlerFunctions = {
		Escape () {
			if (!filterText) {
				handleDidFinish()
			}

			if (filterText) {
				filterText = '';
			}

			return event.preventDefault();
		},
		ArrowUp () {
			formulaSelected.set(formulasVisible[LCHLauncherLogicConstrainIndex(formulasVisible, formulasVisible.indexOf($formulaSelected) - 1)]);

			if (LCHOptionsObject().runMode === LCHLauncherModeJump) {
				apiStart($formulaSelected);
			}

			return event.preventDefault();
		},
		ArrowDown () {
			formulaSelected.set(formulasVisible[LCHLauncherLogicConstrainIndex(formulasVisible, formulasVisible.indexOf($formulaSelected) + 1)]);
			
			if (LCHOptionsObject().runMode === LCHLauncherModeJump) {
				apiStart($formulaSelected);
			}

			return event.preventDefault();
		},
		Enter () {
			if (LCHOptionsObject().runMode !== LCHLauncherModeJump) {
				apiStart($formulaSelected);
			}

			handleDidFinish();

			return event.preventDefault();
		},
	};

	if (Object.keys(handlerFunctions).indexOf(event.code) === -1) {
		return;
	}

	handlerFunctions[event.code]();
}

function handleClick(event) { 
  if (rootElement.contains(event.target)) {
  	return;
  }

  handleDidFinish();
}

function itemDidClick(event, item) {
	apiStart(item);

	handleDidFinish();
}
</script>
<!-- Bind to window to avoit triggering external events on page -->
<svelte:window on:keydown={ handleKeydown } on:click={ handleClick } on:touchstart={ handleClick }/>

<div class="Container" bind:this={ rootElement }>
	<div class="Bezel">
		<input placeholder="{ OLSKLocalized(LCHOptionsObject().runMode === LCHLauncherModeJump ? 'LCHLauncherInputPlaceholderJump' : 'LCHLauncherInputPlaceholderDefault') }" bind:value={ filterText } bind:this={ inputElement } id="LCHLauncherFilterInput" />
		{#if formulasVisible.length }
		<div class="ListContainer">
			{#each formulasVisible as e}
				<div class="ListItem" class:ListItemSelected={ e === $formulaSelected } on:mouseover={ () => formulaSelected.set(e) } on:click={ (event) => itemDidClick(event, e) }>{ e.LCHRecipeTitle }</div>
			{/each}
		</div>
		{/if}
	</div>
</div>

<style>
.Container {
	--__LaunchletWidth: 400px;
	--__LaunchletSharedPadding: 10px;

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
