export const LCHPrimitiveStringCallback = function(inputData) {
	return typeof inputData === 'string';
};

export const LCHPrimitiveStringCanonicalExampleCallback = function() {
	return '';
};

export const LCHPrimitiveStringRecipe = function() {
	return {
		LCHRecipeName: 'String',
		LCHRecipeSignature: 'String',
		LCHRecipeCallback: LCHPrimitiveStringCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback,
	};
};
