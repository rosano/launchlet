export const LCHSearchWithURLFrom = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	let match = param1.match(/LCHSEARCHTOKEN1(.*)LCHSEARCHTOKEN2/i);

	if (!match || !match[1]) {
		return param1;
	};

	return param1.replace(match[0], param2.split(' ').join(match[1]));
};

export const LCHSearchWithCallback = function(param1, param2) {
	return this.api.fn('ROCOLaunchURL')(param2.LCHRecipeCallback(param1));
};

export const LCHSearchWithRecipe = function() {
	return {
		LCHRecipeName: 'Search With',
		LCHRecipeSignature: 'LCHSearchWith',
		LCHRecipeInputTypes: 'String,ServiceSearchURLTemplate',
		LCHRecipeCallback: LCHSearchWithCallback,
	};
};
