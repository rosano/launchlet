import RollupStart from './main.svelte';

import { OLSK_SPEC_UI } from 'OLSKSpec';

const LCHCompose = new RollupStart({
	target: document.body,
});

export default LCHCompose;
