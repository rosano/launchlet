export const LCHComposeBuildPairExtensionPublicKeyIsValid = function(inputData) {
	if (typeof inputData !== 'string') {
		throw 'LCHErrorInputInvalid';
	}

	if (!inputData) {
		return false;
	};
	
	return inputData.trim() === inputData;
};
