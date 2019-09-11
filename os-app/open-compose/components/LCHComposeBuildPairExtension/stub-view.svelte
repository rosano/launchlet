<script>
import Module from './main.svelte';

const mod = {

	BuildPairExtensionDispatchUpdate (inputData) {
		window.LCHComposeBuildPairExtensionDispatchUpdate.innerHTML = parseInt(window.LCHComposeBuildPairExtensionDispatchUpdate.innerHTML) + 1;	
		window.LCHComposeBuildPairExtensionDispatchUpdateText.innerHTML = inputData.detail;	
	},

};
</script>

<Module
	{...Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())}
	on:BuildPairExtensionDispatchUpdate={ mod.BuildPairExtensionDispatchUpdate }
/>

<p>
	<strong>BuildPairExtensionDispatchUpdate</strong>
	<span id="LCHComposeBuildPairExtensionDispatchUpdate">0</span>
	<span id="LCHComposeBuildPairExtensionDispatchUpdateText"></span>
</p>
