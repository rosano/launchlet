export const LBXResponseIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid')
	}

	if (typeof inputData.LBXResponseHash !== 'string') {
		return false;
	};

	if (typeof inputData.LBXResponseError !== 'undefined') {
		if (typeof inputData.LBXResponseError !== 'string') {
			return false;
		};

		if (!inputData.LBXResponseError.trim()) {
			return false;
		};
	};

	return true;
};
