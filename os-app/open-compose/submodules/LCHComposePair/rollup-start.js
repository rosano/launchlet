import RollupStart from './main.svelte';

const LCHComposePair = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposePairClearIsVisible: false,
		LCHComposePairDispatchSubmit: (function  (inputData) {
			window.TestLCHComposePairDispatchSubmit.innerHTML = parseInt(window.TestLCHComposePairDispatchSubmit.innerHTML) + 1;
			window.TestLCHComposePairDispatchSubmitData.innerHTML = inputData;
		}),
		LCHComposePairDispatchClear: (function  () {
			window.TestLCHComposePairDispatchClear.innerHTML = parseInt(window.TestLCHComposePairDispatchClear.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default LCHComposePair;
