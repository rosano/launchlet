export const LCHRunCommandCallback = function(inputData) {
	return inputData
};

export const LCHRunCommandRecipe = function() {
	return {
		LCHRecipeName: 'Run Command',
		LCHRecipeSignature: 'LCHRunCommand',
		LCHRecipeInputTypes: 'Command',
		LCHRecipeCallback: LCHRunCommandCallback,
	};
};
