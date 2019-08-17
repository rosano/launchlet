export const LCHTypeDateCallback = function(inputData) {
	if (!(inputData instanceof Date)) {
		return false;
	}

	if (Number.isNaN(inputData.getTime())) {
		return false;
	}

	return true;
};

export const LCHTypeDateCanonicalExampleCallback = function() {
	return new Date(0);
};

export const LCHTypeDateRecipe = function() {
	return {
		LCHRecipeName: 'Date',
		LCHRecipeSignature: 'Date',
		LCHRecipeCallback: LCHTypeDateCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHTypeDateCanonicalExampleCallback,
	};
};
