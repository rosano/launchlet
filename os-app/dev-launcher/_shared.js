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

import { writable } from 'svelte/store';
export const formulaSelected = writable(null);
export const formulasVisible = writable([]);
export const actionsVisible = writable([]);
export const actionSelected = writable(null);
export const secondaryComponent = writable(null);

export const LCHPromptObjects = function() {
	return [{
		LCHPromptClass: 'LCHLauncherSubjectPrompt',
		LCHPromptHeading: OLSKLocalized('LCHLauncherZoneInputHeadingSubject'),
		LCHPromptItems: [],
		LCHPromptItemSelected: null,
		LCHPromptInputThrottle: undefined,
		LCHPromptFilterText: '',
		LCHPromptMatchStop: false,
		LCHPromptResultsHidden: true,
		LCHPromptResultsThrottle: undefined,
	}, {
		LCHPromptClass: 'LCHLauncherActionPrompt',
		LCHPromptHeading: OLSKLocalized('LCHLauncherZoneInputHeadingAction'),
		LCHPromptItems: [],
		LCHPromptItemSelected: null,
		LCHPromptInputThrottle: undefined,
		LCHPromptFilterText: '',
		LCHPromptMatchStop: false,
		LCHPromptResultsHidden: true,
		LCHPromptResultsThrottle: undefined,
	}];
};
