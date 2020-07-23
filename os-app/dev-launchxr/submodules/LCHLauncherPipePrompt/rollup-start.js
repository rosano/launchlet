import RollupStart from './main.svelte';

const LCHLauncherPipePrompt = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHLauncherPipePromptFilterInputPlaceholderText: '',
		LCHLauncherPipePromptDispatchSelect: (function _LCHLauncherPipePromptDispatchSelect (inputData) {
			window.TestLCHLauncherPipePromptDispatchSelect.innerHTML = parseInt(window.TestLCHLauncherPipePromptDispatchSelect.innerHTML) + 1;
			window.TestLCHLauncherPipePromptDispatchSelectData.innerHTML = JSON.stringify(inputData);
		}),
		LCHLauncherPipePromptDispatchEscape: (function _LCHLauncherPipePromptDispatchEscape () {
			window.TestLCHLauncherPipePromptDispatchEscape.innerHTML = parseInt(window.TestLCHLauncherPipePromptDispatchEscape.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['LCHLauncherPipePromptItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (['LCHLauncherPipePromptItems'].includes(e[0])) {
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

export default LCHLauncherPipePrompt;
