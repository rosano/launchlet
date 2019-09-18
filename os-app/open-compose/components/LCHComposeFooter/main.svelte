<script>
export let LCHComposeFooterStorageStatus = '';

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKReloadButton from '../../../_shared/__external/OLSKReloadButton/main.svelte';
import RCSLanguageSwitcher from '../../../_shared/RCSLanguageSwitcher/main.svelte';

import { OLSKLocalized } from '../../../_shared/common/global.js';
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
</script>

<footer class="Container">

	<OLSKToolbar>
		<OLSKToolbarElementGroup>
			<OLSKReloadButton OLSKLocalized={ OLSKLocalized } />

			<button on:click={ mod.interfaceExportButtonDidClick }>Export</button>

			<input type="file" accept=".json" on:change={ mod.interfaceImportButtonDidClick } />
		</OLSKToolbarElementGroup>
		<RCSLanguageSwitcher />

		<div class="LCHComposeFooterStorageStatus">{ LCHComposeFooterStorageStatus }</div>

		<button class="LCHComposeFooterStorageButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" title={ OLSKLocalized('LCHComposeFooterStorageButtonText') } on:click={ mod.InterfaceStorageButtonDidClick } class:OSWIconVisible={ false }>
			<img src="/open-compose/components/LCHComposeFooter/ui-images/LCHComposeFooterStorageButton.svg">
		</button>
	</OLSKToolbar>
	
</footer>

<style src="./ui-style.css"></style>
