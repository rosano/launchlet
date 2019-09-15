let localizationDictionary = JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`);
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, localizationDictionary[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKString from 'OLSKString';
export const OLSKFormatted = function (inputData) {
	return OLSKString.OLSKStringWithFormat(inputData)
};

export const _LCHIsTestingBehaviour = function () {
	if (typeof require !== 'undefined') {
		return false;
	}

	if (typeof navigator === 'undefined') {
		return false;
	}

	return navigator.appName === 'Zombie';
};

export const _LCH_DISABLE_ENCRYPTION = function () {
	return true;
};
