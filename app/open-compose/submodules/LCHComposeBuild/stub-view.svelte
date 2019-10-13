<script>
import Module from './main.svelte';

const mod = {

	TestLCHComposeBuildDispatchIncludePageRecipes (inputData) {
		window.TestLCHComposeBuildDispatchIncludePageRecipes.innerHTML = parseInt(window.TestLCHComposeBuildDispatchIncludePageRecipes.innerHTML) + 1;
		window.TestLCHComposeBuildDispatchIncludePageRecipesValue.innerHTML = inputData.detail;
	},

};
</script>

<Module
	LCHComposeBuildPackageStyle={ '' }
	LCHComposeBuildPackageScript={ '' }
	BuildInitializeModePipeEnabled={ false }
	BuildAppLanguageCode={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
	on:LCHComposeBuildDispatchIncludePageRecipes={ mod.TestLCHComposeBuildDispatchIncludePageRecipes }
	{...Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())}
	/>

<p>
	<strong>LCHComposeBuildDispatchIncludePageRecipes</strong>
	<span id="TestLCHComposeBuildDispatchIncludePageRecipes">0</span>
	<span id="TestLCHComposeBuildDispatchIncludePageRecipesValue">undefined</span>
</p>
