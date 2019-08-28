export const LCHTypeSubjectContainerCallback = function(inputData) {
	if (!inputData.LCHRecipeName) {
		return false;
	}
	
	if (inputData.LCHRecipeOutputType !== 'SubjectContainer') {
		return false;
	}

	return true;
};

export const LCHTypeSubjectContainerCanonicalExampleCallback = function() {
	return {
		LCHRecipeName: 'alfa',
		LCHRecipeCallback () {},
		LCHRecipeOutputType: 'SubjectContainer',
	};
};

export const LCHTypeSubjectContainerRecipe = function() {
	return {
		LCHRecipeName: 'Subject Container',
		LCHRecipeSignature: 'SubjectContainer',
		LCHRecipeCallback: LCHTypeSubjectContainerCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: LCHTypeSubjectContainerCanonicalExampleCallback,
		_LCHRecipeTypeIsExclusive: true,
	};
};
