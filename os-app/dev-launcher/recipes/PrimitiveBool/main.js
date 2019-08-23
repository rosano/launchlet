export const LCHPrimitiveBoolCallback = function(inputData) {
	return !!inputData;
};

export const LCHPrimitiveBoolRecipe = function() {
	return {
		LCHRecipeSignature: 'Bool',
		LCHRecipeCallback: LCHPrimitiveBoolCallback,
	};
};
