import RollupStart from './main.svelte';

const LCHLauncherPipeItem = new RollupStart({
	target: document.body,
	props: Object.fromEntries((new window.URLSearchParams(window.location.search)).entries()),
});

export default LCHLauncherPipeItem;
