<script>
export let OLSKLocalized;
export let LCHLaunchxrCommandItems;
export let LCHLaunchxrCommandDidSelect;
export let LCHLaunchxrCommandDidTerminate;

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

import fuzzysortPackage from 'fuzzysort';

import LCHLaunchxrLogic from '../../logic.js';

const mod = {

	// VALUE

	_ValueItemsAll: LCHLaunchxrCommandItems,

	_ValueFilterText: '',

	_ValueItemsVisible: [],
	ValueItemsVisible (inputData) {
		mod._ValueItemsVisible = !mod._ValueFilterText ? inputData : LCHLaunchxrLogic.LCHLaunchxrFilterFunction(fuzzysortPackage, mod._ValueFilterText, inputData);
	},

	_ValueItemSelected: undefined,

	// INTERFACE

	InterfaceWindowDidKeyDown () {
		const handlerFunctions = {
			Escape () {
				LCHLaunchxrCommandDidTerminate();
			},
			Enter () {
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
		LCHLaunchxrCommandDidSelect(inputData);

		LCHLaunchxrCommandDidTerminate();
	},

	// MESSAGE

	OLSKMasterListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	OLSKMasterListDispatchArrow (inputData) {
		mod._ValueItemSelected = inputData;
	},

};

import OLSKMasterList from 'OLSKMasterList';
import LCHLaunchxrResultItem from '../LCHLaunchxrResultItem/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLaunchxrCommand LCHLaunchxr">

<OLSKMasterList
	OLSKMasterListItems={ mod._ValueItemsVisible }
	OLSKMasterListItemSelected={ mod._ValueItemSelected }
	OLSKMasterListFilterText={ mod._ValueFilterText }
	OLSKMasterListDispatchClick={ mod.ControlRun }
	OLSKMasterListDispatchArrow={ mod.OLSKMasterListDispatchArrow }
	OLSKMasterListDispatchFilter={ mod.OLSKMasterListDispatchFilter }
	
	let:OLSKResultsListItem={ item }
	OLSKMasterListItemAccessibilitySummaryFor={ (inputData) => inputData }	

	OLSKMasterListFilterFieldClass={ 'LCHLaunchxrFilterInput' }
	OLSKMasterListFilterFieldPlaceholderText={ OLSKLocalized('LCHLaunchxrFilterInputText') }
	OLSKMasterListFilterFieldAutofocus={ true }
	OLSKMasterListFilterFieldClearButton={ false }
	>
	<LCHLaunchxrResultItem LCHLaunchxrResultItemObject={ item }
		/>
</OLSKMasterList>

</div>
