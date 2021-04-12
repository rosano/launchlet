<script>
export let LCHLauncherPromptItems;
export let LCHLauncherPromptPlaceholderText = '';
export let LCHLauncherPromptFilterInputPlaceholderText;
export let LCHLauncherPromptDispatchSelect;
export let LCHLauncherPromptDispatchEscape;

import { OLSK_SPEC_UI } from 'OLSKSpec';

import fuzzysortPackage from 'fuzzysort';

import LCHLauncherLogic from '../../logic.js';

const mod = {

	// VALUE

	_ValueItemsAll: LCHLauncherPromptItems,

	_ValueFilterText: '',

	_ValueItemsVisible: [],
	ValueItemsVisible (inputData) {
		mod._ValueItemsVisible = !mod._ValueFilterText ? inputData : LCHLauncherLogic.LCHLauncherFilterFunction(fuzzysortPackage, mod._ValueFilterText, inputData);
	},

	_ValueItemSelected: undefined,

	// INTERFACE

	InterfaceWindowDidKeyDown () {
		const handlerFunctions = {

			Escape () {
				LCHLauncherPromptDispatchEscape();
			},

			Enter () {
				if (!mod._ValueItemSelected) {
					return;
				}
				
				mod.ControlRun(mod._ValueItemSelected);
			},

		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	ControlFilter (inputData) {
		mod._ValueFilterText = inputData;

		mod.ValueItemsVisible(mod._ValueItemsAll);

		mod.ControlSelect(mod._ValueItemsVisible[0]);
	},

	ControlSelect (inputData) {
		mod._ValueItemSelected = inputData;

		LCHLauncherPromptDispatchSelect(inputData);
	},

	// MESSAGE

	OLSKNarrowDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod.ControlSelect(inputData);
	},

	OLSKCollectionDispatchClick (inputData) {
		mod.ControlSelect(inputData);
	},

};

import OLSKNarrow from 'OLSKNarrow';
import LCHLauncherResultItem from '../LCHLauncherResultItem/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLauncherPrompt">

<OLSKNarrow
	OLSKCollectionItems={ mod._ValueItemsVisible }
	OLSKCollectionItemsLocus={ mod._ValueItemSelected }
	OLSKNarrowFilterText={ mod._ValueFilterText }
	OLSKCollectionDispatchClick={ mod.OLSKCollectionDispatchClick }
	OLSKCollectionDispatchArrow={ mod.OLSKCollectionDispatchArrow }
	OLSKNarrowDispatchFilter={ mod.OLSKNarrowDispatchFilter }
	
	let:OLSKCollectionItem={ item }
	OLSKCollectionItemAccessibilitySummaryFunction={ (inputData) => inputData }	

	OLSKNarrowFilterFieldClass={ 'LCHLauncherFilterInput' }
	OLSKNarrowFilterFieldPlaceholderText={ LCHLauncherPromptFilterInputPlaceholderText }
	OLSKNarrowFilterFieldAutofocus={ true }
	OLSKNarrowFilterFieldClearButton={ false }
	>
	<div slot="OLSKNarrowToolbarHead">
		{#if mod._ValueItemSelected }
			<div class="LCHLauncherPromptSelectedItem">
				<LCHLauncherResultItem LCHLauncherResultItemObject={ mod._ValueItemSelected }
					/>
			</div>
		{:else}
			<div class="LCHLauncherPromptPlaceholder">{ LCHLauncherPromptPlaceholderText }</div>
		{/if}
	</div>
	<LCHLauncherResultItem LCHLauncherResultItemObject={ item }
		/>
</OLSKNarrow>

</div>
