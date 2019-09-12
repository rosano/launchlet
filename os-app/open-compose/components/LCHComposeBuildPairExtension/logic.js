export const LCHResponseIsValid = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw 'LCHErrorInputInvalid'
	}

	if (typeof inputData.LCHResponseString !== 'string') {
		return false;
	};
	
	return true;
};
