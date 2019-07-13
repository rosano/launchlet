<script>
import ModuleHeader from './ModuleHeader.svelte';
import ModuleMaster from './ModuleMaster.svelte';
import ModuleDetail from './ModuleDetail.svelte';

import { storageClient } from './persistence.js';

import Widget from '../_shared/_external/remotestorage-widget/build/widget.js';

import { onMount } from 'svelte';

onMount(function () {
	(new Widget(storageClient.remoteStorage)).attach('LCHStorageWidget');	
});
</script>

<div class="AppContainer">

<ModuleHeader />

<div class="ContentContainer">
	<ModuleMaster />
	<ModuleDetail />
</div>

<div id="LCHStorageWidget"></div>

</div>

<style>
.AppContainer {
	height: 100vh;

	font-family: 'Helvetica Neue', 'Helvetica', sans;

	/* AppContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}

.ContentContainer {
	/* ContentContainerFlexboxParent */
	display: flex;
}
</style>
