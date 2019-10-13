<script>
import Module from './main.svelte';

const mod = {

	StubBuildPairExtensionDispatchPublicKeyUpdate (inputData) {
		window.LCHComposeBuildPairExtensionDispatchPublicKeyUpdate.innerHTML = parseInt(window.LCHComposeBuildPairExtensionDispatchPublicKeyUpdate.innerHTML) + 1;
		window.LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText.innerHTML = inputData.detail;
	},

};
</script>

<Module
	{...Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())}
	on:BuildPairExtensionDispatchPublicKeyUpdate={ mod.StubBuildPairExtensionDispatchPublicKeyUpdate }
/>

<p>
	<strong>BuildPairExtensionDispatchPublicKeyUpdate</strong>
	<span id="LCHComposeBuildPairExtensionDispatchPublicKeyUpdate">0</span>
	<span id="LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText">undefined</span>
</p>
