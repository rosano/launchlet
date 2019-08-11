export const LCHRunCommandCallback = function(inputData) {
	return inputData.LCHRecipeCallback;
};

export const LCHRunCommandRecipe = function() {
	return {
		LCHRecipeTitle: 'Run Command',
		LCHRecipeSignature: 'LCHRunCommand',
		LCHRecipeInputTypes: 'Command',
		LCHRecipeCallback: LCHRunCommandCallback,
	};
};
