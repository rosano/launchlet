export const LCHTypeServiceSearchCallback = function(inputData) {
	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeCallback.length) {
		return false;
	}
	
	if (inputData.LCHRecipeOutputType !== 'ServiceSearchURLTemplate') {
		return false;
	}

	return true;
};

export const LCHTypeServiceSearchCanonicalExampleCallback = function() {
	return {
		LCHRecipeName: 'alfa',
		LCHRecipeCallback () {},
		LCHRecipeOutputType: 'ServiceSearchURLTemplate',
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
