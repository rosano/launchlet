<script>
export let LCHComposeMasterFilterText;
export let LCHComposeMasterListItems;
export let LCHComposeMasterListItemSelected = null;
export let LCHComposeMasterDispatchCreate;
export let LCHComposeMasterDispatchClick;
export let LCHComposeMasterDispatchArrow;
export let LCHComposeMasterDispatchFilter;
export let OLSKMobileViewInactive = false;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec'

import LCHComposeMasterLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		LCHComposeMasterDispatchCreate();
	},

};

import OLSKMasterList from 'OLSKMasterList';
import _OLSKSharedCreate from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
import LCHComposeMasterListItem from '../LCHComposeMasterListItem/main.svelte';
</script>

<OLSKMasterList
	OLSKMasterListItems={ LCHComposeMasterListItems }
	OLSKMasterListItemSelected={ LCHComposeMasterListItemSelected }
	OLSKMasterListFilterText={ LCHComposeMasterFilterText }
	OLSKMasterListDispatchClick={ LCHComposeMasterDispatchClick }
	OLSKMasterListDispatchArrow={ LCHComposeMasterDispatchArrow }
	OLSKMasterListDispatchFilter={ LCHComposeMasterDispatchFilter }
	let:OLSKResultsListItem={ item }
	OLSKMasterListItemAccessibilitySummaryFunction={ (inputData) => LCHComposeMasterLogic.LCHComposeMasterListItemAccessibilitySummary(inputData, OLSKLocalized) }	
	OLSKMasterListClass={ 'LCHComposeMaster' }
	OLSKMobileViewInactive={ OLSKMobileViewInactive }
	>
	<div slot="OLSKMasterListToolbarTail">
		<div class="OLSKToolbarElementGroup"></div>
	</div>

	<div slot="OLSKMasterListItem">
		<LCHComposeMasterListItem
			LCHComposeMasterListItemTitle={ LCHComposeMasterLogic.LCHComposeMasterListItemTitle(item) }
			LCHComposeMasterListItemFlagged={ item.LCHDocumentIsFlagged }
			/>
	</div>
</OLSKMasterList>

<style src="./ui-style.css"></style>
