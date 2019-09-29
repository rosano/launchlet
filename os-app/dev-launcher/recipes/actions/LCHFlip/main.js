export const LCHFlip = function(param1, param2) {
	if (typeof param1 !== 'function') {
		throw new Error('LCHErrorInputNotValid');
	}

	return function() {
		return param1.apply(param2, Array.from(arguments).reverse());
	};
};
