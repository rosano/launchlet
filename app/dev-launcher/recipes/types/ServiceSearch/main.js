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
		LCHRecipeCallback () {
			return 'http://example.com?q=LCHSEARCHTOKEN';
		},
		LCHRecipeOutputType: 'ServiceSearchURLTemplate',
	};
};

export const LCHTypeServiceSearchRecipe = function() {
	return {
		LCHRecipeSignature: 'ServiceSearch',
		LCHRecipeCallback: LCHTypeServiceSearchCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: LCHTypeServiceSearchCanonicalExampleCallback,
	};
};
