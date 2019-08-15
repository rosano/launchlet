export const LCHSearchWithCallback = function(param1, param2) {
	return this.api.fn('ROCOLaunchURL')(param2.LCHRecipeCallback(param1));
};

export const LCHSearchWithRecipe = function() {
	return {
		LCHRecipeName: 'Search With',
		LCHRecipeSignature: 'LCHSearchWith',
		LCHRecipeInputTypes: 'String,ServiceSearch',
		LCHRecipeCallback: LCHSearchWithCallback,
	};
};
