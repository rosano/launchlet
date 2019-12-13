<script>
export let LCHComposeFooterStorageStatus = '';

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {

	// INTERFACE

	InterfaceStorageButtonDidClick () {
		dispatch('LCHComposeFootetDispatchStorage')
	},

	interfaceExportButtonDidClick () {
		dispatch('FooterDispatchExport');
	},
	interfaceImportButtonDidClick (event) {
		let inputElement = event.target;
		let reader = new FileReader();
		
		reader.onload = function (event) {
			dispatch('FooterDispatchImport', event.target.result);
			
			inputElement.value = null;
		};

		reader.readAsText(event.target.files.item(0));
	},
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKReloadButton from '../../../_shared/__external/OLSKReloadButton/main.svelte';
import OLSKLanguageSwitcher from '../../../_shared/__external/OLSKLanguageSwitcher/main.svelte';
</script>

<footer class="Container">

	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<OLSKReloadButton />
			
			<OLSKLanguageSwitcher OLSKSharedActiveRouteConstant={ window.OLSKPublicConstants('OLSKSharedActiveRouteConstant') }
				OLSKSharedPageLanguagesAvailable={ window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable') }
				OLSKSharedPageCurrentLanguage={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
				/>

			<a class="LCHComposeFooterGuideLink" href={ window.OLSKCanonicalFor('LCHGuideRoute') } target="_blank">{ OLSKLocalized('LCHComposeFooterGuideLinkText') }</a>

			<a class="LCHComposeFooterDonateLink" href={ window.OLSKPublicConstants('LCH_SHARED_DONATE_URL') } target="_blank">{ OLSKLocalized('LCHComposeFooterDonateLinkText') }</a>

			<!-- <button on:click={ mod.interfaceExportButtonDidClick }>Export</button> -->

			<!-- <input type="file" accept=".json" on:change={ mod.interfaceImportButtonDidClick } /> -->
		</OLSKToolbarElementGroup>

		<div>
			<div class="LCHComposeFooterStorageStatus">{ LCHComposeFooterStorageStatus }</div>
			<button class="LCHComposeFooterStorageButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" title={ OLSKLocalized('LCHComposeFooterStorageButtonText') } on:click={ mod.InterfaceStorageButtonDidClick } class:OSWIconVisible={ false }>
				<img src="/open-compose/submodules/LCHComposeFooter/ui-images/LCHComposeFooterStorageButton.svg">
			</button>
		</div>
	</OLSKToolbar>
	
</footer>

<style src="./ui-style.css"></style>
