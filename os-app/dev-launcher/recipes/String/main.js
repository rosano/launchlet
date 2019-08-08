export const LCHTypeStringCallback = function(inputData) {
	return typeof inputData === 'string';
};

export const LCHTypeStringCanonicalExampleCallback = function() {
	return '';
};

export const LCHTypeStringRecipe = function() {
	return {
		LCHRecipeName: 'String',
		LCHRecipeSignature: 'String',
		LCHRecipeCallback: LCHTypeStringCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHTypeStringCanonicalExampleCallback,
	};
};
