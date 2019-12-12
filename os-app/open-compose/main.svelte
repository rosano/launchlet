<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

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
		LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'kLCHComposePreferenceModePipeEnabled', event.detail.toString())
	},
	
	LCHComposeBuildDispatchIncludePageRecipes (event) {
		LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'kLCHComposePreferenceIncludePageRecipes', event.detail.toString())
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

	_ValueIncludePageRecipes: undefined,
	ValueIncludePageRecipes(inputData) {
		if (typeof inputData === 'undefined') {
			return mod._ValueIncludePageRecipes;
		}

		mod._ValueIncludePageRecipes = inputData === 'true'
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueInitializeModePipeEnabled()
		
		mod.SetupValueIncludePageRecipes()
	},

	async SetupValueInitializeModePipeEnabled() {
		mod.ValueInitializeModePipeEnabled(await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'kLCHComposePreferenceModePipeEnabled'))
	},
	
	async SetupValueIncludePageRecipes() {
		mod.ValueIncludePageRecipes(await LCHSettingsAction.LCHSettingsActionProperty(storageClient, 'kLCHComposePreferenceIncludePageRecipes'))
	},

	// LIFECYCLE

	LifecycleComponentWillMount() {
		mod.SetupEverything()
	},

};

mod.LifecycleComponentWillMount();

import OLSKViewportContent from 'OLSKViewportContent';
import LCHComposeFooter from './submodules/LCHComposeFooter/main.svelte';
import LCHComposeMaster from './submodules/LCHComposeMaster/main.svelte';
import LCHComposeDetail from './submodules/LCHComposeDetail/main.svelte';
import LCHComposeBuild from './submodules/LCHComposeBuild/main.svelte';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
</script>

<div class="Container OLSKViewport" class:OLSKIsLoading={ $isLoading }>

<OLSKViewportContent>
	<LCHComposeMaster bind:this={ masterInstance } />
	<LCHComposeDetail />
</OLSKViewportContent>

<LCHComposeBuild
	BuildInitializeModePipeEnabled={ mod._ValueInitializeModePipeEnabled }
	LCHComposeBuildIncludePageRecipes={ mod._ValueIncludePageRecipes }
	BuildDocuments={ $DocumentsAllStore }
	LCHComposeBuildPackageStyle={ window.LCHComposeBuildPackageStyle.textContent }
	LCHComposeBuildPackageScript={ window.LCHComposeBuildPackageScript.textContent }
	BuildAppLanguageCode={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }

	on:BuildDispatchModePipeEnabledToggleDidInput={ mod.BuildDispatchModePipeEnabledToggleDidInput }
	on:LCHComposeBuildDispatchIncludePageRecipes={ mod.LCHComposeBuildDispatchIncludePageRecipes }
	/>

<div id="LCHComposeStorageWidget" class:StorageHidden={ mod.StorageHidden }></div>

<LCHComposeFooter on:FooterDispatchExport={ mod.FooterDispatchExport } on:FooterDispatchImport={ mod.FooterDispatchImport } { LCHComposeFooterStorageStatus } on:LCHComposeFootetDispatchStorage={ mod.LCHComposeFootetDispatchStorage } />

</div>

<div class="LCHComposeDebug" class:LCHComposeDebugError={ false }>
	<button class="OLSKLayoutButtonNoStyle" onclick="location.reload();">{ OLSKLocalized('LCHUpdateReloadText') }</button>
</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('LCHServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
