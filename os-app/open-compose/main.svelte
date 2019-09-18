<script>
import OLSKViewportContent from 'OLSKViewportContent';
import LCHComposeFooter from './components/LCHComposeFooter/main.svelte';
import LCHComposeMaster from './components/LCHComposeMaster/main.svelte';
import LCHComposeDetail from './components/LCHComposeDetail/main.svelte';
import LCHComposeBuild from './components/LCHComposeBuild/main.svelte';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';

import { OLSKLocalized, _LCHIsTestingBehaviour } from '../_shared/common/global.js';
import { storageClient, isLoading, DocumentsAllStore } from './persistence.js';
import * as LCHSettingsAction from '../_shared/LCHSetting/action.js';

import { onMount } from 'svelte';
onMount(function () {
	(new window.OLSKStorageWidget(storageClient.remoteStorage)).attach('LCHComposeStorageWidget').backend(document.querySelector('#IconTarget'));
});

let masterInstance;
const mod = {
	FooterDispatchExport () {
		masterInstance.DocumentsExport();
	},
	FooterDispatchImport (event) {
		masterInstance.DocumentsImport(event.detail);
	},
	BuildDispatchModePipeEnabledToggleDidInput (event) {
		LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'LCHSettingComposeModePipeEnabled', event.detail.toString())
	},

	// VALUE

	_ValueInitializeModePipeEnabled: undefined,
	ValueInitializeModePipeEnabled(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueInitializeModePipeEnabled;
		}

		mod._ValueInitializeModePipeEnabled = inputData === 'true'
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueInitializeModePipeEnabled()
	},
	async SetupValueInitializeModePipeEnabled() {
		mod.ValueInitializeModePipeEnabled(await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'LCHSettingComposeModePipeEnabled'))
	},

	// LIFECYCLE

	LifecycleComponentWillMount() {
		mod.SetupEverything()
	},

};

mod.LifecycleComponentWillMount();

</script>

<div class="Container OLSKViewport" class:OLSKIsLoading={ $isLoading }>

<OLSKViewportContent>
	<LCHComposeMaster bind:this={ masterInstance } />
	<LCHComposeDetail />
</OLSKViewportContent>

<LCHComposeBuild
	BuildInitializeModePipeEnabled={ mod._ValueInitializeModePipeEnabled }
	BuildDocuments={ $DocumentsAllStore }
	BuildAppStyle={ window.LCHComposeLauncherStyle.textContent }
	BuildAppBehaviour={ window.LCHComposeLauncherBehaviour.textContent }
	BuildAppLanguageCode={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }

	on:BuildDispatchModePipeEnabledToggleDidInput={ mod.BuildDispatchModePipeEnabledToggleDidInput }
	/>

<LCHComposeFooter on:FooterDispatchExport={ mod.FooterDispatchExport } on:FooterDispatchImport={ mod.FooterDispatchImport } />
<div id="LCHComposeStorageWidget" class:StorageHidden={ mod.StorageHidden }></div>

</div>

<div class="LCHComposeDebug" class:LCHComposeDebugError={ false }>
	<button class="OLSKLayoutButtonNoStyle" onclick="location.reload();">{ OLSKLocalized('LCHUpdateReloadText') }</button>
</div>

{#if !_LCHIsTestingBehaviour()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('LCHServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
