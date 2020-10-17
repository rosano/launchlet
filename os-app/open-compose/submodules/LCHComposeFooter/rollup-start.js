import RollupStart from './main.svelte';

const LCHComposeFooter = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeFooterDispatchStorage: (function  () {
			window.TestLCHComposeFooterDispatchStorage.innerHTML = parseInt(window.TestLCHComposeFooterDispatchStorage.innerHTML) + 1;
		}),
		_LCHComposeFooterDispatchExport: (function  () {}),
		_LCHComposeFooterDispatchImport: (function  () {}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default LCHComposeFooter;
