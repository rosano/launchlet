import * as _URLParser from 'url-parse';
const URLParser = typeof _URLParser === 'function' ? _URLParser : _URLParser.default;

export const LCHTypeURLCallback = function(inputData) {
	if (typeof inputData !== 'string') {
		// throw new Error('LCHErrorInputInvalid');
		return false
	}

	if (!(new URLParser(inputData)).hostname) {
		return false;
	}

	return true;
};

export const LCHTypeStringCanonicalExampleCallback = function() {
	return 'http://example.com';
};

export const LCHTypeURLRecipe = function() {
	return {
		LCHRecipeName: 'URL',
		LCHRecipeSignature: 'URL',
		LCHRecipeCallback: LCHTypeURLCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHTypeStringCanonicalExampleCallback,
	};
};
