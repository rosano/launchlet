import { LCHTypeURLCallback } from '../TypeURL/main.js';

export const LCHTypeServiceSearchURLTemplateCallback = function(inputData) {
	if (!LCHTypeURLCallback(inputData)) {
		return false;
	}

	if (!inputData.match(/LCH.*SEARCH.*TOKEN/i)) {
		return false;
	}

	return true;
};

export const LCHTypeStringCanonicalExampleCallback = function() {
	return 'http://example.com?q=LCH+SEARCH+TOKEN';
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
