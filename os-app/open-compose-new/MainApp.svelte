<script>
import ModuleHeader from './ModuleHeader.svelte';
import ModuleMaster from './ModuleMaster.svelte';
import ModuleDetail from './ModuleDetail.svelte';
import ModuleCompile from './ModuleCompile.svelte';

import { storageClient } from './persistence.js';

import { onMount } from 'svelte';
import Widget from '../_shared/_external/remotestorage-widget/build/widget.js';
onMount(function () {
	(new Widget(storageClient.remoteStorage)).attach('LCHStorageWidget');	
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

<div id="LCHStorageWidget"></div>

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
