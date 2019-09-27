export const LCHSearchActionURLFrom = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!param1.match(/LCHSEARCHTOKEN/i)) {
		return param1;
	}

	return param1.replace(/LCHSEARCHTOKEN/i, param2.split(' ').map(function (e) {
		return encodeURIComponent(e);
	}).join('+'));
};

export const LCHSearchWithCallback = function(param1, param2) {
	return this.api.fn('LCHURLOpen')(LCHSearchActionURLFrom(param2, param1));
};

export const LCHSearchWithRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHSearchWith',
		LCHRecipeInputTypes: 'String,ServiceSearchURLTemplate',
		LCHRecipeCallback: LCHSearchWithCallback,
	};
};

import { LCHFlip } from '../LCHFlip/main.js';
export const LCHSearchForCallback = function() {
	return LCHFlip(LCHSearchWithCallback, this)(...arguments);
};

export const LCHSearchForRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHSearchFor',
		LCHRecipeInputTypes: 'ServiceSearchURLTemplate,String',
		LCHRecipeCallback: LCHSearchForCallback,
	};
};
