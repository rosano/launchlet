import RollupStart from './main.svelte';

const LCHComposeListItem = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeListItemFlagged: false,
	}, Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())),
});

export default LCHComposeListItem;
