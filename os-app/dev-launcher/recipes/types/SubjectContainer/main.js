export const SubjectContainerCallback = function(inputData) {
	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeOutputType !== '[Subject]') {
		return false;
	}

	return true;
};

export const SubjectContainerCanonicalExampleCallback = function() {
	return {
		LCHRecipeName: 'alfa',
		LCHRecipeCallback () {},
		LCHRecipeOutputType: '[Subject]',
	};
};

export const SubjectContainerRecipe = function() {
	return {
		LCHRecipeName: 'Subject Container',
		LCHRecipeSignature: 'SubjectContainer',
		LCHRecipeCallback: SubjectContainerCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: SubjectContainerCanonicalExampleCallback,
	};
};
