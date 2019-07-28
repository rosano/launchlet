<script>
import { LCHOptionsObject, OLSKLocalized } from './_shared.js';
import { LCHLauncherModeJump, LCHBookmarkletLogicFilter } from './ui-logic.js';
import { LCHMembersModelErrorsForFormulaObject } from '../_shared/rs-modules/lch_members/model.js';

export let memberObjects = [];
export let optionsObject = {};

(function StartSetup() {
	LCHOptionsObject(optionsObject);
})();

(function StartPageFormulas() {
	if (typeof window.LCHPageFormulas !== 'function') {
		return;
	}

	let formulas = window.LCHPageFormulas();

	if (!Array.isArray(formulas)) {
		return;
	}

	memberObjects.push(...formulas.filter(function(e) {
		return !LCHMembersModelErrorsForFormulaObject(e);
	}));
})();

const api = {
	functionObjects () {
		return memberObjects;
	},
	actionObjects () {
		return api.functionObjects().filter(function (e) {
			return !!e.name;
		});
	},
	fn (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHBookmarkletErrorIdentifierNotString');
		}

		if (inputData === '') {
			throw new Error('LCHBookmarkletErrorIdentifierBlank');
		}

		if (inputData.trim() !== inputData) {
			throw new Error('LCHBookmarkletErrorIdentifierContainsUntrimmedWhitespace');
		}

		let functionObject = api.functionObjects().filter(function (e) {
			return e.id === inputData;
		}).shift();

		if (!functionObject) {
			throw new Error('LCHBookmarkletErrorIdentifierNotDefined');
		}

		return functionObject.fn.bind({
			api: api,
		});
	},
};

let filterText = '';

let memberObjectSelected;
let visibleFormulas = [];
let filterTextDidChange = function (val) {
	visibleFormulas = !val ? [] : memberObjects.filter(LCHBookmarkletLogicFilter(val));
	memberObjectSelected = visibleFormulas[0];
};
$: filterTextDidChange(filterText.trim());

let rootElement;

function setElementAtIndex(inputData) {
	memberObjectSelected = visibleFormulas[Math.max(0, Math.min(visibleFormulas.length, inputData))];
}

function launchElement(inputData) {
	if (!inputData || !inputData.fn) {
		return;
	}

	filterText = inputData.name;
	
	api.fn(inputData.id)();
	
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
		setElementAtIndex(visibleFormulas.indexOf(memberObjectSelected) - 1);
		return event.preventDefault();
	}

	if (event.code === 'ArrowDown') {
		setElementAtIndex(visibleFormulas.indexOf(memberObjectSelected) + 1);
		return event.preventDefault();
	}

	if (event.code === 'Enter') {
		launchElement(memberObjectSelected);
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
		<input placeholder="{ OLSKLocalized(LCHOptionsObject().runMode === LCHLauncherModeJump ? 'LCHBookmarkletInputPlaceholderJump' : 'LCHBookmarkletInputPlaceholderDefault') }" bind:value={ filterText } bind:this={ inputElement } />
		{#if visibleFormulas.length }
		<div class="ListContainer">
			{#each visibleFormulas as e}
				<div class="ListItem" class:ListItemSelected={ e === memberObjectSelected } on:mouseover={ () => memberObjectSelected = e } on:click={ () => launchElement(e) }>{ e.name }</div>
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
}

.ListItem {
	padding: 5px;

	font-weight: bold;

	/* Behaviour */
	cursor: pointer;
}

.ListItemSelected {
	background: #cccccc;
}
</style>
