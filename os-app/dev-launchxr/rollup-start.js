import RollupStart from './main.svelte';

import * as LCHPackage from './package.js';

LCHPackage.mod._ValueClass = RollupStart;

export default LCHPackage.LCHPackage();
