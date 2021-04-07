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

	OLSKMasterListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod._ValueItemSelected = inputData;
	},

};

import OLSKMasterList from 'OLSKMasterList';
import LCHLauncherResultItem from '../LCHLauncherResultItem/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLauncherCommand LCHLauncher">

<OLSKMasterList
	OLSKCollectionItems={ mod._ValueItemsVisible }
	OLSKCollectionItemsLocus={ mod._ValueItemSelected }
	OLSKMasterListFilterText={ mod._ValueFilterText }
	OLSKCollectionDispatchClick={ mod.ControlRun }
	OLSKCollectionDispatchArrow={ mod.OLSKCollectionDispatchArrow }
	OLSKMasterListDispatchFilter={ mod.OLSKMasterListDispatchFilter }
	
	let:OLSKCollectionItem={ item }
	OLSKCollectionItemAccessibilitySummaryFunction={ (inputData) => inputData }	

	OLSKMasterListFilterFieldClass={ 'LCHLauncherFilterInput' }
	OLSKMasterListFilterFieldPlaceholderText={ OLSKLocalized('LCHLauncherFilterInputText') }
	OLSKMasterListFilterFieldAutofocus={ true }
	OLSKMasterListFilterFieldClearButton={ false }
	>
	<LCHLauncherResultItem LCHLauncherResultItemObject={ item }
		/>
</OLSKMasterList>

</div>
