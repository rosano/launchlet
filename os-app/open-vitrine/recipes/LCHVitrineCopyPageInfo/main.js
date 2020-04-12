import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

export const LCHVitrineCopyPageInfoCallback = function() {
	window.alert(OLSKLocalized('LCHVitrineCopyPageInfoAlertText'));
	
	return this.api.LCHCopyToClipboard(`${document.title} ${location.href}`);
};

export const LCHVitrineCopyPageInfoRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineCopyPageInfoCallback,
		LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
	};
};
