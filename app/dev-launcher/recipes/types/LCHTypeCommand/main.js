export const LCHTypeCommandCallback = function(inputData) {
	// if (LCHRecipesModelErrorsFor(inputData)) {
	// 	throw new Error('LCHErrorInputNotValid');
	// }

	if (!inputData.LCHRecipeName) {
		return false;
	}

	if (inputData.LCHRecipeCallback.length) {
		return false;
	}

	return true;
};

export const LCHTypeStringCanonicalExampleCallback = function() {
	return {
		LCHRecipeName: 'alfa',
		LCHRecipeCallback () {},
	};
};

export const LCHTypeCommandRecipe = function() {
	return {
		LCHRecipeSignature: 'Command',
		LCHRecipeCallback: LCHTypeCommandCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: LCHTypeStringCanonicalExampleCallback,
	};
};
