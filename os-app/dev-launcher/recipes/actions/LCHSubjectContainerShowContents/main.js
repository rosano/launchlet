export const LCHSubjectContainerShowContentsCallback = function(inputData) {
	return inputData;
};

export const LCHSubjectContainerShowContentsRecipe = function() {
	return {
		LCHRecipeName: 'Show Contents',
		LCHRecipeSignature: 'LCHSubjectContainerShowContents',
		LCHRecipeInputTypes: 'SubjectContainer',
		LCHRecipeCallback: LCHSubjectContainerShowContentsCallback,
	};
};
