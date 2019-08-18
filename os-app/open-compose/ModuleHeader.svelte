<script>
import { OLSKLocalized } from '../_shared/common/global.js';
import RCSLanguageSwitcher from '../_shared/RCSLanguageSwitcher/Main.svelte';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {
	interfaceExportButtonDidClick () {
		dispatch('ModuleHeaderDispatchExport');
	},
	interfaceImportButtonDidClick (event) {
		let inputElement = event.target;
		let reader = new FileReader();
		
		reader.onload = function (event) {
			dispatch('ModuleHeaderDispatchImport', event.target.result);
			
			inputElement.value = null;
		};

		reader.readAsText(event.target.files.item(0))
	},
}
</script>

<header class="Container">

<h1>{ OLSKLocalized('LCHComposeTitle') }</h1>

<button on:click={ mod.interfaceExportButtonDidClick }>Export</button>

<input type="file" accept=".json" on:change={ mod.interfaceImportButtonDidClick } />

<RCSLanguageSwitcher />
	
</header>

<style>
.Container {
	/* AppContainerFlexboxChild */
	flex-shrink: 0;

	/* ContainerFlexboxParent */
	display: flex;
	justify-content: space-between;
	align-items: center;
}

h1 {
	margin: 0;

	font-size: 20px;
}

:global(#RCSLanguageSwitcher) {
	padding: 10px;

	font-size: 13px;
}

:global(#RCSLanguageSwitcher span) {
	/* browser quirks */
	padding-left: 4px;
}
</style>
