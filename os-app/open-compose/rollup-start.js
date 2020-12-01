import RollupStart from './main.svelte';

import { OLSK_SPEC_UI } from 'OLSKSpec';

const LCHCompose = new RollupStart({
	target: document.body,
	props: OLSK_SPEC_UI() ? Object.assign({}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))) : undefined,
});

export default LCHCompose;
