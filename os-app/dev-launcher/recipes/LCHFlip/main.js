export const LCHFlip = function(param1, param2, param3) {
	if (typeof param1 !== 'function') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!Array.isArray(param2)) {
		throw new Error('LCHErrorInputInvalid');
	}

	return param1.apply(param3, param2.reverse());
};
