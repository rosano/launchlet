export const LCHComposeBuildPairExtensionPublicKeyIsValid = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!inputData) {
		return false;
	};
	
	return inputData.trim() === inputData;
};
