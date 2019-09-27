export const LCHSubjectContainerShowContentsCallback = function(inputData) {
	return inputData;
};

export const LCHSubjectContainerShowContentsRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHSubjectContainerShowContents',
		LCHRecipeInputTypes: 'SubjectContainer',
		LCHRecipeCallback: LCHSubjectContainerShowContentsCallback,
	};
};
