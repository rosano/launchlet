import RollupStart from './main.svelte';

const LCHComposeFooter = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeFooterDispatchStorage: (function _LCHComposeFooterDispatchStorage () {
			window.TestLCHComposeFooterDispatchStorage.innerHTML = parseInt(window.TestLCHComposeFooterDispatchStorage.innerHTML) + 1;
		}),
		_LCHComposeFooterDispatchExport: (function __LCHComposeFooterDispatchExport () {}),
		_LCHComposeFooterDispatchImport: (function __LCHComposeFooterDispatchImport () {}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default LCHComposeFooter;
