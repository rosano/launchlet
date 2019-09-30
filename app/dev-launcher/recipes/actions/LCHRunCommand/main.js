export const LCHRunCommandCallback = function(inputData) {
	return inputData
};

export const LCHRunCommandRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHRunCommand',
		LCHRecipeInputTypes: 'Command',
		LCHRecipeCallback: LCHRunCommandCallback,
	};
};
