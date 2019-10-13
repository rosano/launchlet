import { OLSKLocalized } from '../../../_shared/common/global.js'

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
