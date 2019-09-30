<script>
import OLSKViewportContent from 'OLSKViewportContent';
import LCHComposeFooter from './submodules/LCHComposeFooter/main.svelte';
import LCHComposeMaster from './submodules/LCHComposeMaster/main.svelte';
import LCHComposeDetail from './submodules/LCHComposeDetail/main.svelte';
import LCHComposeBuild from './submodules/LCHComposeBuild/main.svelte';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';

import { OLSKLocalized, _LCHIsTestingBehaviour } from '../_shared/common/global.js';
import { storageClient, isLoading, DocumentsAllStore } from './persistence.js';
import * as LCHSettingsAction from '../_shared/LCHSetting/action.js';

let LCHComposeFooterStorageStatus = '';
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
OLSKRemoteStorage.OLSKRemoteStorageStatus(storageClient.remoteStorage, function (inputData) {
	LCHComposeFooterStorageStatus = inputData
}, OLSKLocalized)

import { onMount } from 'svelte';
onMount(function () {
	(new window.OLSKStorageWidget(storageClient.remoteStorage)).attach('LCHComposeStorageWidget').backend(document.querySelector('.LCHComposeFooterStorageButton'));
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

	StorageHidden: true,
	LCHComposeFootetDispatchStorage () {
		mod.StorageHidden = !mod.StorageHidden;
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

<div id="LCHComposeStorageWidget" class:StorageHidden={ mod.StorageHidden }></div>

<LCHComposeFooter on:FooterDispatchExport={ mod.FooterDispatchExport } on:FooterDispatchImport={ mod.FooterDispatchImport } { LCHComposeFooterStorageStatus } on:LCHComposeFootetDispatchStorage={ mod.LCHComposeFootetDispatchStorage } />

</div>

<div class="LCHComposeDebug" class:LCHComposeDebugError={ false }>
	<button class="OLSKLayoutButtonNoStyle" onclick="location.reload();">{ OLSKLocalized('LCHUpdateReloadText') }</button>
</div>

{#if !_LCHIsTestingBehaviour()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('LCHServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
