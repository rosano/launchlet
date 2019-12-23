import RollupStart from './main.svelte';

const LCHComposeMasterListItem = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeMasterListItemFlagged: false,
	}, Object.fromEntries((new window.URLSearchParams(window.location.search)).entries())),
});

export default LCHComposeMasterListItem;
