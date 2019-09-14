export const LCHVitrineSendEmailCallback = function() {
	return window.location.href = 'mailto:';
};

export const LCHVitrineSendEmailRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineSendEmailCallback,
		LCHRecipeSignature: 'LCHVitrineSendEmail',
	};
};
