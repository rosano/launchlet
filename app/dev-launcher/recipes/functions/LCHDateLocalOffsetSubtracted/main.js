export const LCHDateLocalOffsetSubtractedCallback = function(inputData) {
	return new Date(Date.parse(inputData) - inputData.getTimezoneOffset() * 1000 * 60);
};

export const LCHDateLocalOffsetSubtractedRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHDateLocalOffsetSubtracted',
		LCHRecipeInputTypes: 'Date',
		LCHRecipeCallback: LCHDateLocalOffsetSubtractedCallback,
	};
};
