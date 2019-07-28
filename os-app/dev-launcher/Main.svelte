<script>
import { LCHOptionsObject, OLSKLocalized, formulaSelected } from './_shared.js';
import { LCHLauncherModeJump, LCHLauncherLogicFilter } from './ui-logic.js';
import { LCHRecipesModelErrorsFor } from './api.js';

export let formulaObjects = [];
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

	formulaObjects.push(...pageFormulas.filter(function(e) {
		return !LCHFormulasModelErrorsForFormulaObject(e);
	}));
})();

import { LCHAPIObjectFor } from './api.js';
const api = LCHAPIObjectFor(formulaObjects);

formulaSelected.subscribe(function (val) {
	if (!val) {
		return;
	}

	if (LCHOptionsObject().runMode !== LCHLauncherModeJump) {
		return;
	}

	api.fn(val.LCHRecipeSignature)();
});

let filterText = '';
let formulasVisible = [];
let formulasDefault = LCHOptionsObject().runMode === LCHLauncherModeJump ? formulaObjects : [];
let filterTextDidChange = function (val) {
	formulasVisible = !val ? formulasDefault : formulaObjects.filter(LCHLauncherLogicFilter(val));

	formulaSelected.set(!val ? null : formulasVisible[0]);
};
$: filterTextDidChange(filterText.trim());

let rootElement;

function launchElement(inputData) {
	if (LCHOptionsObject().runMode !== LCHLauncherModeJump) {
		filterText = inputData.LCHRecipeName;

		inputData.LCHRecipeCallback.bind({
			api: api,
		})();
	}
	
	handleDidFinish();
}

let inputElement;
import { onMount } from 'svelte';
onMount(function () {
	inputElement.focus();
});

function handleDidFinish() {
	if (typeof optionsObject._didFinish !== 'function') {
		return;
	}

	return optionsObject._didFinish();
}

function handleKeydown(event) {
	if (event.code === 'Escape') {
		if (!filterText) {
			handleDidFinish()
		}

		if (filterText) {
			filterText = '';
		}

		return event.preventDefault();
	}

	if (event.code === 'ArrowUp') {
		formulaSelected.set(formulasVisible[Math.max(0, Math.min(formulasVisible.length, formulasVisible.indexOf($formulaSelected) - 1))]);
		return event.preventDefault();
	}

	if (event.code === 'ArrowDown') {
		formulaSelected.set(formulasVisible[Math.max(0, Math.min(formulasVisible.length, formulasVisible.indexOf($formulaSelected) + 1))]);
		return event.preventDefault();
	}

	if (event.code === 'Enter') {
		launchElement($formulaSelected);
		return event.preventDefault();
	}
}

function handleClick(event) { 
  if (rootElement.contains(event.target)) {
  	return;
  }

  handleDidFinish();
};
</script>
<!-- Bind to window to avoit triggering external events on page -->
<svelte:window on:keydown={ handleKeydown } on:click={ handleClick }/>

<div class="Container" bind:this={ rootElement }>
	<div class="Bezel">
		<input placeholder="{ OLSKLocalized(LCHOptionsObject().runMode === LCHLauncherModeJump ? 'LCHLauncherInputPlaceholderJump' : 'LCHLauncherInputPlaceholderDefault') }" bind:value={ filterText } bind:this={ inputElement } />
		{#if formulasVisible.length }
		<div class="ListContainer">
			{#each formulasVisible as e}
				<div class="ListItem" class:ListItemSelected={ e === $formulaSelected } on:mouseover={ () => formulaSelected.set(e) } on:click={ () => launchElement(e) }>{ e.LCHRecipeName }</div>
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

	/* CapHeight */
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
</style>
