import RollupStart from './main.svelte';

const LCHComposeListItem = new RollupStart({
	target: document.body,
	props: Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function ([key, value]) {
		return [key, (function() {
			if (key === 'LCHComposeListItem') {
				return JSON.parse(value);
			}

			return value;
		})()]
	})),
});

export default LCHComposeListItem;
