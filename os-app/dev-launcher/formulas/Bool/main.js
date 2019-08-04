export const LCHTypeBoolCallback = function(inputData) {
	return !!inputData;
};

export const LCHTypeBool = function() {
	return {
		LCHRecipeName: 'Boolean',
		LCHRecipeSignature: 'Bool',
		LCHRecipeCallback: LCHTypeBoolCallback,
	};
};
