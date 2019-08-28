export const LCHPrimitiveDOMElementCallback = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return false;
	}

	if (typeof inputData.focus !== 'function') {
		return false;
	}

	return true;
};

export const LCHPrimitiveDOMElementCanonicalExampleCallback = function() {
	return {
		focus () {},
	};
};

export const LCHPrimitiveDOMElementRecipe = function() {
	return {
		LCHRecipeName: 'DOM Element',
		LCHRecipeCallback: LCHPrimitiveDOMElementCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: LCHPrimitiveDOMElementCanonicalExampleCallback,
		LCHRecipeSignature: 'DOMElement',
		_LCHRecipeTypeIsExclusive: true,
	};
};
