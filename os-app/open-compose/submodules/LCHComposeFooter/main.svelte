<script>
export let LCHComposeFooterStorageStatus = '';
export let LCHComposeFooterDispatchStorage;
export let _LCHComposeFooterDispatchExport;
export let _LCHComposeFooterDispatchImport;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// INTERFACE

	InterfaceExportButtonDidClick () {
		_LCHComposeFooterDispatchExport();
	},

	InterfaceImportButtonDidClick (event) {
		const inputElement = event.target;
		const fileReader = new FileReader();
		
		fileReader.onload = function (event) {
			_LCHComposeFooterDispatchImport(event.target.result);
			
			inputElement.value = null;
		};

		fileReader.readAsText(event.target.files.item(0));
	},

};

import OLSKReloadButton from '../../../_shared/__external/OLSKReloadButton/main.svelte';
import OLSKLanguageSwitcher from '../../../_shared/__external/OLSKLanguageSwitcher/main.svelte';
import _OLSKSharedCloud from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCloud.svg';
</script>

<footer class="LCHComposeFooter OLSKToolbar OLSKToolbarJustify">

	<div class="OLSKToolbarElementGroup">
		<OLSKReloadButton />
		
		<OLSKLanguageSwitcher OLSKSharedActiveRouteConstant={ window.OLSKPublicConstants('OLSKSharedActiveRouteConstant') }
			OLSKSharedPageLanguagesAvailable={ window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable') }
			OLSKSharedPageCurrentLanguage={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
			/>

		<a class="LCHComposeFooterGuideLink" href={ window.OLSKCanonicalFor('LCHGuideRoute') } target="_blank">{ OLSKLocalized('LCHComposeFooterGuideLinkText') }</a>

		<a class="LCHComposeFooterDonateLink" href={ window.OLSKPublicConstants('LCH_SHARED_DONATE_URL') } target="_blank">{ OLSKLocalized('LCHComposeFooterDonateLinkText') }</a>

		<!-- <button on:click={ mod.InterfaceExportButtonDidClick }>Export</button>

		<input type="file" accept=".json" on:change={ mod.InterfaceImportButtonDidClick } /> -->
	</div>

	<div class="OLSKToolbarElementGroup">
		<div class="LCHComposeFooterStorageStatus">{ LCHComposeFooterStorageStatus }</div>
		
		<button class="LCHComposeFooterStorageButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('LCHComposeFooterStorageButtonText') } on:click={ LCHComposeFooterDispatchStorage } class:OSWIconVisible={ false }>
			<div class="LCHComposeFooterStorageButtonImage">{@html _OLSKSharedCloud }</div>
		</button>
	</div>
	
</footer>

<style src="./ui-style.css"></style>
