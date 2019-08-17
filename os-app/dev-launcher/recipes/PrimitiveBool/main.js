export const LCHPrimitiveBoolCallback = function(inputData) {
	return !!inputData;
};

export const LCHPrimitiveBoolRecipe = function() {
	return {
		LCHRecipeName: 'Boolean',
		LCHRecipeSignature: 'Bool',
		LCHRecipeCallback: LCHPrimitiveBoolCallback,
	};
};
