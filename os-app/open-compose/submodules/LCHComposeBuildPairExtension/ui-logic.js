export const LCHComposeBuildPairExtensionPublicKeyIsValid = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!inputData) {
		return false;
	};
	
	return inputData.trim() === inputData;
};
