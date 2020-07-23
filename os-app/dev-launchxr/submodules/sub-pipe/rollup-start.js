import RollupStart from './main.svelte';

const LCHLauncherPipe = new RollupStart({
	target: document.body,
	props: Object.assign({}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default LCHLauncherPipe;