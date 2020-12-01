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

	OLSKMasterListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	OLSKMasterListDispatchArrow (inputData) {
		mod.ControlSelect(inputData);
	},

	OLSKMasterListDispatchClick (inputData) {
		mod.ControlSelect(inputData);
	},

};

import OLSKMasterList from 'OLSKMasterList';
import LCHLauncherResultItem from '../LCHLauncherResultItem/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLauncherPrompt">

<OLSKMasterList
	OLSKMasterListItems={ mod._ValueItemsVisible }
	OLSKMasterListItemSelected={ mod._ValueItemSelected }
	OLSKMasterListFilterText={ mod._ValueFilterText }
	OLSKMasterListDispatchClick={ mod.OLSKMasterListDispatchClick }
	OLSKMasterListDispatchArrow={ mod.OLSKMasterListDispatchArrow }
	OLSKMasterListDispatchFilter={ mod.OLSKMasterListDispatchFilter }
	
	let:OLSKResultsListItem={ item }
	OLSKMasterListItemAccessibilitySummaryFor={ (inputData) => inputData }	

	OLSKMasterListFilterFieldClass={ 'LCHLauncherFilterInput' }
	OLSKMasterListFilterFieldPlaceholderText={ LCHLauncherPromptFilterInputPlaceholderText }
	OLSKMasterListFilterFieldAutofocus={ true }
	OLSKMasterListFilterFieldClearButton={ false }
	>
	<div slot="OLSKMasterListToolbarHead">
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
</OLSKMasterList>

</div>
