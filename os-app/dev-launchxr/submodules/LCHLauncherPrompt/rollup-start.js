import RollupStart from './main.svelte';

const LCHLaunchxrPrompt = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHLaunchxrPromptFilterInputPlaceholderText: '',
		LCHLaunchxrPromptDispatchSelect: (function  (inputData) {
			window.TestLCHLaunchxrPromptDispatchSelect.innerHTML = parseInt(window.TestLCHLaunchxrPromptDispatchSelect.innerHTML) + 1;
			window.TestLCHLaunchxrPromptDispatchSelectData.innerHTML = JSON.stringify(inputData);
		}),
		LCHLaunchxrPromptDispatchEscape: (function  () {
			window.TestLCHLaunchxrPromptDispatchEscape.innerHTML = parseInt(window.TestLCHLaunchxrPromptDispatchEscape.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['LCHLaunchxrPromptItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (['LCHLaunchxrPromptItems'].includes(e[0])) {
			(e[1] || []).forEach(function (e) {
				return Object.assign(e, {
					LCHRecipeCallback: eval(e.LCHRecipeCallback),
					LCHRecipeIsExcluded: eval(e.LCHRecipeIsExcluded),
				});
			});
		}

		return e;
	}))),
});

export default LCHLaunchxrPrompt;
