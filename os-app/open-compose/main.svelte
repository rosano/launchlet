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
	CompileDispatchModePipeEnabledToggleDidInput (event) {
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
	CompileInitializeModePipeEnabled={ mod._ValueInitializeModePipeEnabled }
	CompileDocuments={ $DocumentsAllStore }
	CompileAppStyle={ window.LCHComposeLauncherStyle.textContent }
	CompileAppBehaviour={ window.LCHComposeLauncherBehaviour.textContent }
	CompileAppLanguageCode={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }

	on:CompileDispatchModePipeEnabledToggleDidInput={ mod.CompileDispatchModePipeEnabledToggleDidInput }
	/>

<LCHComposeFooter on:FooterDispatchExport={ mod.FooterDispatchExport } on:FooterDispatchImport={ mod.FooterDispatchImport } />

</div>

<div id="LCHComposeStorageWidget"></div>
<div class="LCHComposeDebug">
	<button class="OLSKLayoutButtonNoStyle" onclick="location.reload();">{ OLSKLocalized('LCHUpdateReloadText') }</button>
</div>

{#if !_LCHIsTestingBehaviour()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('LCHServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
