<script>
import OLSKViewportContent from 'OLSKViewportContent';
import LCHComposeFooter from './modules/LCHComposeFooter/main.svelte';
import ModuleMaster from './ModuleMaster.svelte';
import ModuleDetail from './ModuleDetail.svelte';
import LCHCompile from './modules/LCHCompile/main.svelte';
import OLSKServiceWorker from '../_shared/_external/OLSKServiceWorker/Main.svelte';

import { OLSKLocalized, _LCHIsTestingBehaviour } from '../_shared/common/global.js';
import { storageClient, isLoading, DocumentsAllStore } from './persistence.js';

import { onMount } from 'svelte';
import Widget from 'remotestorage-widget';
onMount(function () {
	(new Widget(storageClient.remoteStorage)).attach('LCHComposeStorageWidget');	
});

let masterInstance;
const mod = {
	FooterDispatchExport () {
		masterInstance.DocumentsExport();
	},
	FooterDispatchImport (event) {
		masterInstance.DocumentsImport(event.detail);
	},
}
</script>

<div class="Container OLSKViewport" class:OLSKIsLoading={ $isLoading }>

<OLSKViewportContent>
	<ModuleMaster bind:this={ masterInstance } />
	<ModuleDetail />
</OLSKViewportContent>

<LCHCompile CompileDocuments={ $DocumentsAllStore } OLSKLocalized={ OLSKLocalized } />

<LCHComposeFooter on:FooterDispatchExport={ mod.FooterDispatchExport } on:FooterDispatchImport={ mod.FooterDispatchImport } />

</div>

<div id="LCHComposeStorageWidget"></div>
<div class="LCHComposeDebug">
	<button class="OLSKLayoutButtonNoStyle" onclick="location.reload();">{ OLSKLocalized('LCHUpdateReloadText') }</button>
</div>

{#if !_LCHIsTestingBehaviour()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('LCHServiceWorkerRoute') } />
{/if}

<style>
.Container {
	--LCHBorderStyle: 1px solid #ddd;
	
	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-size: 9pt;
}
</style>
