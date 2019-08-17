export const LCHPrimitiveDateCallback = function(inputData) {
	if (!(inputData instanceof Date)) {
		return false;
	}

	if (Number.isNaN(inputData.getTime())) {
		return false;
	}

	return true;
};

export const LCHPrimitiveDateCanonicalExampleCallback = function() {
	return new Date(0);
};

export const LCHPrimitiveDateRecipe = function() {
	return {
		LCHRecipeName: 'Date',
		LCHRecipeSignature: 'Date',
		LCHRecipeCallback: LCHPrimitiveDateCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHPrimitiveDateCanonicalExampleCallback,
	};
};
