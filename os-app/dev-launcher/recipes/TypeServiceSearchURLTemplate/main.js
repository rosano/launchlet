import { LCHTypeURLCallback } from '../TypeURL/main.js';

export const LCHTypeServiceSearchURLTemplateCallback = function(inputData) {
	if (!LCHTypeURLCallback(inputData)) {
		return false;
	}

	if (!inputData.match(/LCHSEARCHTOKEN1.*LCHSEARCHTOKEN2/i)) {
		return false;
	}

	return true;
};

export const LCHTypeStringCanonicalExampleCallback = function() {
	return 'http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2';
};

export const LCHTypeServiceSearchURLTemplateRecipe = function() {
	return {
		LCHRecipeName: 'Search Service URL Template',
		LCHRecipeCallback: LCHTypeServiceSearchURLTemplateCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHTypeStringCanonicalExampleCallback,
		LCHRecipeSignature: 'ServiceSearchURLTemplate',
	};
};
