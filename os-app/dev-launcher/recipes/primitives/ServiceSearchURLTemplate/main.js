import { LCHPrimitiveURLCallback } from '../URL/main.js';

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
	return 'https://example.com?q=LCHSEARCHTOKEN';
};

export const LCHPrimitiveServiceSearchURLTemplateRecipe = function() {
	return {
		LCHRecipeCallback: LCHPrimitiveServiceSearchURLTemplateCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback,
		LCHRecipeSignature: 'ServiceSearchURLTemplate',
		_LCHRecipeTypeIsExclusive: true,
	};
};
