import RollupStart from './main.svelte';

const LCHLauncherPrompt = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHLauncherPromptFilterInputPlaceholderText: '',
		LCHLauncherPromptDispatchSelect: (function  (inputData) {
			window.TestLCHLauncherPromptDispatchSelect.innerHTML = parseInt(window.TestLCHLauncherPromptDispatchSelect.innerHTML) + 1;
			window.TestLCHLauncherPromptDispatchSelectData.innerHTML = JSON.stringify(inputData);
		}),
		LCHLauncherPromptDispatchEscape: (function  () {
			window.TestLCHLauncherPromptDispatchEscape.innerHTML = parseInt(window.TestLCHLauncherPromptDispatchEscape.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['LCHLauncherPromptItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (['LCHLauncherPromptItems'].includes(e[0])) {
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

export default LCHLauncherPrompt;
