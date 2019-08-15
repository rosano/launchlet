export const LCHTypeServiceSearchCallback = function(inputData) {
	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeCallback.length !== 1) {
		return false;
	}
	
	if (inputData.LCHRecipeOutputType !== 'URL') {
		return false;
	}

	return true;
};

export const LCHTypeServiceSearchCanonicalExampleCallback = function() {
	return {
		LCHRecipeCallback (alfa) {},
		LCHRecipeName: 'bravo',
		LCHRecipeOutputType: 'URL',
	};
};

export const LCHTypeServiceSearchRecipe = function() {
	return {
		LCHRecipeName: 'Search Service',
		LCHRecipeSignature: 'ServiceSearch',
		LCHRecipeCallback: LCHTypeServiceSearchCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHTypeServiceSearchCanonicalExampleCallback,
	};
};
