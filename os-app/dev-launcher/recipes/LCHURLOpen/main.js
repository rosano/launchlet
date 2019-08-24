export const LCHURLOpenCallback = function(inputData) {
	if (!inputData) {
		return;
	};

	window.open(inputData, '_blank').focus();
};

export const LCHURLOpenRecipe = function() {
	return {
		LCHRecipeName: 'Open URL',
		LCHRecipeSignature: 'LCHURLOpen',
		LCHRecipeInputTypes: 'URL',
		LCHRecipeCallback: LCHURLOpenCallback,
	};
};
