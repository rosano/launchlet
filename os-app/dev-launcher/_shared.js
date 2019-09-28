let _LCHOptionsObject = {};
import { LCHLauncherOptions } from './ui-logic.js';
export const LCHOptionsObject = function(inputData) {
	return !inputData ? _LCHOptionsObject : (_LCHOptionsObject = LCHLauncherOptions(inputData));
};

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[LCHOptionsObject().languageCode]);
};

import { writable } from 'svelte/store';
export const secondaryComponent = writable(null);
