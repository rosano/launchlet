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

	// MESSAGE

	OLSKInputWrapperDispatchClear () {
		LCHComposeMasterDispatchFilter('');
	},

	// VALUE

	_ValueFilterFieldFocused: true,

	// DATA

	DataIsFocused () {
		return document.activeElement === document.querySelector('.LCHComposeMasterFilterField');
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// INTERFACE

	InterfaceFilterFieldDidInput (event) {
		LCHComposeMasterDispatchFilter(this.value);
	},

	InterfaceCreateButtonDidClick () {
		LCHComposeMasterDispatchCreate();
	},

	// SETUP

	SetupEverything () {
		mod.SetupFilterFieldEventListeners();
	},

	SetupFilterFieldEventListeners () {
		setTimeout(function () {
			document.querySelector('.LCHComposeMasterFilterField').addEventListener('focus', function () {
				mod._ValueFilterFieldFocused = true;
			});

			document.querySelector('.LCHComposeMasterFilterField').addEventListener('blur', function () {
				mod._ValueFilterFieldFocused = false;
			});
		}, 100);
	},

	// LIFECYCLE

	LifecycleComponentDidMount () {
		mod.SetupEverything();
	},

	LifecycleComponentDidUpdate () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			return;
		}

		if (mod.DataIsMobile()) {
			return;
		}
		
		const element = document.querySelector('.OLSKResultsListItemSelected');

		if (!element) {
			return;
		}
		
		element.scrollIntoView({
			block: 'nearest',
			inline: 'nearest',
		});
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleComponentDidMount);

import { afterUpdate } from 'svelte';
afterUpdate(mod.LifecycleComponentDidUpdate);

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKInputWrapper from 'OLSKInputWrapper';
import _OLSKSharedCreate from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
import OLSKResults from 'OLSKResults';
import LCHComposeMasterListItem from '../LCHComposeMasterListItem/main.svelte';
</script>

<div class="LCHComposeMaster OLSKViewportMaster" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } class:LCHComposeMasterFocused={ mod._ValueFilterFieldFocused } aria-hidden={ OLSKMobileViewInactive ? true : null }>

<header class="LCHComposeMasterToolbar OLSKMobileViewHeader">
	<OLSKToolbar>
		<OLSKInputWrapper OLSKInputWrapperValue={ LCHComposeMasterFilterText } OLSKInputWrapperDispatchClear={ mod.OLSKInputWrapperDispatchClear } >
			<input class="LCHComposeMasterFilterField" placeholder={ OLSKLocalized('LCHComposeMasterFilterFieldText') } bind:value={ LCHComposeMasterFilterText } on:input={ mod.InterfaceFilterFieldDidInput } />
		</OLSKInputWrapper>

		<OLSKToolbarElementGroup>
			<button class="LCHComposeMasterCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n" title={ OLSKLocalized('LCHComposeMasterCreateButtonText') }>
				<div class="LCHComposeMasterCreateButtonImage">{@html _OLSKSharedCreate }</div>
			</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<section class="LCHComposeMasterBody OLSKMobileViewBody">
	<OLSKResults
		OLSKResultsListItems={ LCHComposeMasterListItems }
		OLSKResultsListItemSelected={ LCHComposeMasterListItemSelected }
		OLSKResultsDispatchClick={ LCHComposeMasterDispatchClick }
		OLSKResultsDispatchArrow={ (inputData) => mod.DataIsFocused() && LCHComposeMasterDispatchArrow(inputData) }
		let:OLSKResultsListItem={ e }
		>
		<LCHComposeMasterListItem
			LCHComposeMasterListItemAccessibilitySummary={ LCHComposeMasterLogic.LCHComposeMasterListItemAccessibilitySummary(e, OLSKLocalized) }
			LCHComposeMasterListItemTitle={ LCHComposeMasterLogic.LCHComposeMasterListItemTitle(e) }
			LCHComposeMasterListItemFlagged={ e.LCHDocumentIsFlagged }
			/>
	</OLSKResults>
</section>

</div>

<style src="./ui-style.css"></style>
