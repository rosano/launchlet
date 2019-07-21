import OLSKInternational from 'OLSKInternational';

let localizationLanguageCode = 'en';

export const languageCode = function(inputData) {
	if (!inputData) {
		return localizationLanguageCode;
	}

	localizationLanguageCode = inputData;
};

let localizationDictionary = JSON.parse(`{"PLUGIN_ALFA_SEARCH_REPLACE":"PLUGIN_ALFA_SEARCH_REPLACE"}`);

export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedStringWithTranslationKeyAndTranslationDictionary(translationConstant, localizationDictionary[languageCode()]);
};
