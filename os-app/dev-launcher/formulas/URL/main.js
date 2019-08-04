import * as Url from 'url-parse';

export const LCHTypeURLCallback = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!(new Url(inputData)).hostname) {
		return false;
	}

	return true;
};

export const LCHTypeURLRecipe = function() {
	return {
		LCHRecipeName: 'URL',
		LCHRecipeSignature: 'URL',
		LCHRecipeCallback: LCHTypeURLCallback,
	};
};
