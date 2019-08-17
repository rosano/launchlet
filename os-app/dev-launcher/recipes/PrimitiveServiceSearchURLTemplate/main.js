import { LCHPrimitiveURLCallback } from '../PrimitiveURL/main.js';

export const LCHPrimitiveServiceSearchURLTemplateCallback = function(inputData) {
	if (!LCHPrimitiveURLCallback(inputData)) {
		return false;
	}

	if (!inputData.match(/LCHSEARCHTOKEN1.*LCHSEARCHTOKEN2/i)) {
		return false;
	}

	return true;
};

export const LCHPrimitiveStringCanonicalExampleCallback = function() {
	return 'http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2';
};

export const LCHPrimitiveServiceSearchURLTemplateRecipe = function() {
	return {
		LCHRecipeName: 'Search Service URL Template',
		LCHRecipeCallback: LCHPrimitiveServiceSearchURLTemplateCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback,
		LCHRecipeSignature: 'ServiceSearchURLTemplate',
	};
};
