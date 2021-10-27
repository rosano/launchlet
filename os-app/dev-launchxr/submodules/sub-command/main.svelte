<script>
export let OLSKLocalized;
export let LCHLauncherCommandItems;
export let LCHLauncherCommandDidSelect;
export let LCHLauncherCommandDidTerminate;

import { OLSK_SPEC_UI } from 'OLSKSpec';

import fuzzysortPackage from 'fuzzysort';

import LCHLauncherLogic from '../../logic.js';

const mod = {

	// VALUE

	_ValueItemsAll: LCHLauncherCommandItems,

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
				if (!mod._ValueFilterText) {
					return LCHLauncherCommandDidTerminate();
				}

				mod.ControlFilter('');
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

		mod._ValueItemSelected = mod._ValueItemsVisible[0];
	},

	ControlRun (inputData) {
		LCHLauncherCommandDidSelect(inputData);

		LCHLauncherCommandDidTerminate();
	},

	// MESSAGE

	OLSKNarrowDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod._ValueItemSelected = inputData;
	},

};

import OLSKNarrow from 'OLSKNarrow';
import LCHLaunchxrResultItem from '../LCHLaunchxrResultItem/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLauncherCommand LCHLauncher">

<OLSKNarrow
	OLSKCollectionItems={ mod._ValueItemsVisible }
	OLSKCollectionItemsLocus={ mod._ValueItemSelected }
	OLSKNarrowFilterText={ mod._ValueFilterText }
	OLSKCollectionDispatchClick={ mod.ControlRun }
	OLSKCollectionDispatchArrow={ mod.OLSKCollectionDispatchArrow }
	OLSKNarrowDispatchFilter={ mod.OLSKNarrowDispatchFilter }
	
	let:OLSKCollectionItem={ item }
	OLSKCollectionItemAccessibilitySummaryFunction={ (inputData) => inputData }	

	OLSKNarrowFilterFieldClass={ 'LCHLauncherFilterInput' }
	OLSKNarrowFilterFieldPlaceholderText={ OLSKLocalized('LCHLauncherFilterInputText') }
	OLSKNarrowFilterFieldAutofocus={ true }
	OLSKNarrowFilterFieldClearButton={ false }
	>
	<LCHLaunchxrResultItem LCHLaunchxrResultItemObject={ item }
		/>
</OLSKNarrow>

</div>
