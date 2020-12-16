import * as _URLParser from 'url-parse';
const URLParser = typeof _URLParser === 'function' ? _URLParser : _URLParser.default;

export const LCHPrimitiveURLCallback = function(inputData) {
	if (typeof inputData !== 'string') {
		// throw new Error('LCHErrorInputNotValid');
		return false;
	}

	if (!(new URLParser(inputData, {})).hostname) { // To parse an input independently of the browser's current URL (e.g. for functionality parity with the library in a Node environment), pass an empty location object as the second parameter
		return false;
	}

	return true;
};

export const LCHPrimitiveStringCanonicalExampleCallback = function() {
	return 'https://example.com';
};

export const LCHPrimitiveURLRecipe = function() {
	return {
		LCHRecipeSignature: 'URL',
		LCHRecipeCallback: LCHPrimitiveURLCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback,
	};
};
