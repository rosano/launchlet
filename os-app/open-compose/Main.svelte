<script>
import ModuleHeader from './ModuleHeader.svelte';
import ModuleMaster from './ModuleMaster.svelte';
import ModuleDetail from './ModuleDetail.svelte';
import ModuleCompile from './ModuleCompile.svelte';
import OLSKServiceWorker from '../_shared/OLSKServiceWorker/Main.svelte';

import { OLSKLocalized } from '../_shared/common/global.js'
import { storageClient } from './persistence.js';

import { onMount } from 'svelte';
import Widget from 'remotestorage-widget';
onMount(function () {
	(new Widget(storageClient.remoteStorage)).attach('LCHComposeStorageWidget');	
});
</script>

<div class="AppContainer">

<ModuleHeader />

<div class="AppContentContainer">
	<ModuleMaster />
	<ModuleDetail />
</div>

<ModuleCompile />

</div>

<div id="LCHComposeStorageWidget"></div>
<div class="LCHComposeDebug">
	<button class="OLSKLayoutButtonNoStyle" onclick="location.reload();">{ OLSKLocalized('LCHUpdateReloadText') }</button>
</div>

<OLSKServiceWorker isDisabled={ window.OLSKPublicConstants('OLSKServiceWorkerDisabled') } registrationRoute={ window.OLSKCanonicalFor('LCHServiceWorkerRoute') } />

<style>
.AppContainer {
	height: 100vh;

	font-family: 'Helvetica Neue', 'Helvetica', sans;

	/* AppContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}

.AppContentContainer {
	/* AppContainerFlexboxChild */
	flex-grow: 1;

	/* AppContentContainerFlexboxParent */
	display: flex;
}

.AppContentContainer ModuleDetail {
	background: black;
}
</style>
