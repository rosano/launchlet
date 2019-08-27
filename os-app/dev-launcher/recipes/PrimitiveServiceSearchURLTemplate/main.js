import { LCHPrimitiveURLCallback } from '../PrimitiveURL/main.js';

export const LCHPrimitiveServiceSearchURLTemplateCallback = function(inputData) {
	if (!LCHPrimitiveURLCallback(inputData)) {
		return false;
	}

	if (!inputData.match(/LCHSEARCHTOKEN/i)) {
		return false;
	}

	return true;
};

export const LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback = function() {
	return 'http://example.com?q=LCHSEARCHTOKEN';
};

export const LCHPrimitiveServiceSearchURLTemplateRecipe = function() {
	return {
		LCHRecipeName: 'Search Service URL Template',
		LCHRecipeCallback: LCHPrimitiveServiceSearchURLTemplateCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback,
		LCHRecipeSignature: 'ServiceSearchURLTemplate',
		_LCHRecipeNonEquivalenceTypes: 'String,URL',
	};
};
