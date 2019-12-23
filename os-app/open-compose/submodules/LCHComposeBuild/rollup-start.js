import RollupStart from './main.svelte';

const LCHComposeBuild = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeBuildPipeModeEnabled: false,
		LCHComposeBuildPageRecipesEnabled: false,
		LCHComposeBuildDispatchRun: (function _LCHComposeBuildDispatchRun () {
			window.TestLCHComposeBuildDispatchRun.innerHTML = parseInt(window.TestLCHComposeBuildDispatchRun.innerHTML) + 1;
		}),
		LCHComposeBuildDispatchPipeModeEnabled: (function _LCHComposeBuildDispatchPipeModeEnabled (inputData) {
			window.TestLCHComposeBuildDispatchPipeModeEnabled.innerHTML = parseInt(window.TestLCHComposeBuildDispatchPipeModeEnabled.innerHTML) + 1;
			window.TestLCHComposeBuildDispatchPipeModeEnabledData.innerHTML = inputData;
		}),
		LCHComposeBuildDispatchPageRecipesEnabled: (function _LCHComposeBuildDispatchPageRecipesEnabled (inputData) {
			window.TestLCHComposeBuildDispatchPageRecipesEnabled.innerHTML = parseInt(window.TestLCHComposeBuildDispatchPageRecipesEnabled.innerHTML) + 1;
			window.TestLCHComposeBuildDispatchPageRecipesEnabledData.innerHTML = inputData;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default LCHComposeBuild;
