let _LCHOptionsObject = {};
import { LCHLauncherOptions } from './ui-logic.js';
export const LCHOptionsObject = function(inputData) {
	return !inputData ? _LCHOptionsObject : (_LCHOptionsObject = LCHLauncherOptions(inputData));
};

let localizationDictionary = JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`);
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedStringWithTranslationKeyAndTranslationDictionary(translationConstant, localizationDictionary[LCHOptionsObject().languageCode]);
};

import OLSKString from 'OLSKString';
export const OLSKFormatted = OLSKString.OLSKStringWithFormat;

import { writable } from 'svelte/store';
export const secondaryComponent = writable(null);
