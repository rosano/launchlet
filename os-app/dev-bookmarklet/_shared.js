let _languageCode = 'en';
export const languageCode = function(inputData) {
	return !inputData ? _languageCode : (_languageCode = inputData);
};

import { LCHLauncherModes } from './ui-logic.js';
let _runMode = LCHLauncherModes().shift();
export const runMode = function(inputData) {
	if (LCHLauncherModes().indexOf(inputData) === -1) {
		return;
	}

	_runMode = inputData;
};

import OLSKInternational from 'OLSKInternational';
let localizationDictionary = JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`);
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedStringWithTranslationKeyAndTranslationDictionary(translationConstant, localizationDictionary[languageCode()]);
};
