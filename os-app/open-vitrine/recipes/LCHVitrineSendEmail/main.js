import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

export const LCHVitrineSendEmailCallback = function() {
	const url = 'mailto:';

	if (OLSK_TESTING_BEHAVIOUR()) {
		return window.alert(url)
	};

	window.location.href = url;
};

export const LCHVitrineSendEmailRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineSendEmailCallback,
		LCHRecipeSignature: 'LCHVitrineSendEmail',
	};
};
