export const LCHRunCommandCallback = function(inputData) {
	return inputData
};

export const LCHRunCommandRecipe = function() {
	return {
		LCHRecipeName: 'Run Command',
		LCHRecipeInputTypes: 'Command',
		LCHRecipeCallback: LCHRunCommandCallback,
	};
};
