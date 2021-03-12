const mod = {

	LCHComposeListItemTitle (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		return inputData.LCHDocumentName || inputData.LCHDocumentSignature || inputData.LCHDocumentID;
	},

};

export default mod;
