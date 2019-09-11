<script>
import Module from './main.svelte';

const mod = {

	BuildPairExtensionDispatchPublicKeyUpdate (inputData) {
		window.LCHComposeBuildPairExtensionDispatchPublicKeyUpdate.innerHTML = parseInt(window.LCHComposeBuildPairExtensionDispatchPublicKeyUpdate.innerHTML) + 1;	
		window.LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText.innerHTML = inputData.detail;	
	},

};
</script>

<Module
	{...Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())}
	on:BuildPairExtensionDispatchPublicKeyUpdate={ mod.BuildPairExtensionDispatchPublicKeyUpdate }
/>

<p>
	<strong>BuildPairExtensionDispatchPublicKeyUpdate</strong>
	<span id="LCHComposeBuildPairExtensionDispatchPublicKeyUpdate">0</span>
	<span id="LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText"></span>
</p>
