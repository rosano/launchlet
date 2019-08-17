import * as _URLParser from 'url-parse';
const URLParser = typeof _URLParser === 'function' ? _URLParser : _URLParser.default;

export const LCHPrimitiveURLCallback = function(inputData) {
	if (typeof inputData !== 'string') {
		// throw new Error('LCHErrorInputInvalid');
		return false;
	}

	if (!(new URLParser(inputData)).hostname) {
		return false;
	}

	return true;
};

export const LCHPrimitiveStringCanonicalExampleCallback = function() {
	return 'http://example.com';
};

export const LCHPrimitiveURLRecipe = function() {
	return {
		LCHRecipeName: 'URL',
		LCHRecipeSignature: 'URL',
		LCHRecipeCallback: LCHPrimitiveURLCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback,
	};
};
