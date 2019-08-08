let _LCHOptionsObject = {};
import { LCHLauncherOptions } from './ui-logic.js';
export const LCHOptionsObject = function(inputData) {
	return !inputData ? _LCHOptionsObject : (_LCHOptionsObject = LCHLauncherOptions(inputData));
};

import { writable } from 'svelte/store';
export const formulaSelected = writable(null);
export const formulasVisible = writable([]);
export const secondaryComponent = writable(null);
