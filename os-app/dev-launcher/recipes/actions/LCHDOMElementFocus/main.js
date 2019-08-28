export const LCHDOMElementFocusCallback = function(inputData) {
	if (!inputData) {
		return;
	}

	inputData.focus();
};

export const LCHDOMElementFocusRecipe = function() {
	return {
		LCHRecipeName: 'Focus',
		LCHRecipeSignature: 'LCHDOMElementFocus',
		LCHRecipeInputTypes: 'DOMElement',
		LCHRecipeCallback: LCHDOMElementFocusCallback,
	};
};
