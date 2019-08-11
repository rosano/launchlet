export const LCHTypeBoolCallback = function(inputData) {
	return !!inputData;
};

export const LCHTypeBoolRecipe = function() {
	return {
		LCHRecipeTitle: 'Boolean',
		LCHRecipeSignature: 'Bool',
		LCHRecipeCallback: LCHTypeBoolCallback,
	};
};
