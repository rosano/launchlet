export const LCHTypeBoolCallback = function(inputData) {
	return !!inputData;
};

export const LCHTypeBoolRecipe = function() {
	return {
		LCHRecipeName: 'Boolean',
		LCHRecipeSignature: 'Bool',
		LCHRecipeCallback: LCHTypeBoolCallback,
	};
};
