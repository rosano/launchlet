import OLSKInternational from 'OLSKInternational';

let _languageCode = 'en';
export const languageCode = function(inputData) {
	return !inputData ? _languageCode : (_languageCode = inputData);
};

let localizationDictionary = JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`);
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedStringWithTranslationKeyAndTranslationDictionary(translationConstant, localizationDictionary[languageCode()]);
};
