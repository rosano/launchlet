export const LCHTypeSubjectContainerCallback = function(inputData) {
	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeOutputType !== '[Subject]') {
		return false;
	}

	return true;
};

export const LCHTypeSubjectContainerCanonicalExampleCallback = function() {
	return {
		LCHRecipeName: 'alfa',
		LCHRecipeCallback () {},
		LCHRecipeOutputType: '[Subject]',
	};
};

export const LCHTypeSubjectContainerRecipe = function() {
	return {
		LCHRecipeName: 'Subject Container',
		LCHRecipeSignature: 'SubjectContainer',
		LCHRecipeCallback: LCHTypeSubjectContainerCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: LCHTypeSubjectContainerCanonicalExampleCallback,
	};
};
