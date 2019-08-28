<script>
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKReloadButton from 'OLSKReloadButton';
import RCSLanguageSwitcher from '../../../_shared/RCSLanguageSwitcher/mainx.svelte';

import { OLSKLocalized } from '../../../_shared/common/global.js';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {
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
	</OLSKToolbar>
	
</footer>

<style src="./ui-style.css"></style>
