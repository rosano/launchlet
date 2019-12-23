import RollupStart from './main.svelte';

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const LCHCompose = new RollupStart({
	target: document.body,
	props: OLSK_TESTING_BEHAVIOUR() ? Object.assign({}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))) : undefined,
});

export default LCHCompose;
