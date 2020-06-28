<script>
export let LCHComposeMasterFilterText;
export let LCHComposeMasterListItems;
export let LCHComposeMasterListItemSelected = null;
export let LCHComposeMasterDispatchCreate;
export let LCHComposeMasterDispatchClick;
export let LCHComposeMasterDispatchArrow;
export let LCHComposeMasterDispatchFilter;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

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
	OLSKMasterListItemAccessibilitySummaryFor={ (inputData) => LCHComposeMasterLogic.LCHComposeMasterListItemAccessibilitySummary(inputData, OLSKLocalized) }	
	OLSKMasterListClass={ 'LCHComposeMaster' }
	OLSKMobileViewInactive={ OLSKMobileViewInactive }
	>
	<div slot="OLSKMasterListToolbarTail">
		<div class="OLSKToolbarElementGroup">
			<button class="LCHComposeMasterCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('LCHComposeMasterCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
				<div class="LCHComposeMasterCreateButtonImage">{@html _OLSKSharedCreate }</div>
			</button>
		</div>
	</div>

	<LCHComposeMasterListItem
		LCHComposeMasterListItemTitle={ LCHComposeMasterLogic.LCHComposeMasterListItemTitle(item) }
		LCHComposeMasterListItemFlagged={ item.LCHDocumentIsFlagged }
		/>
</OLSKMasterList>

<style src="./ui-style.css"></style>
