const mod = {

	LCHComposeMasterListItemAccessibilitySummary (inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		return (inputData.LCHDocumentIsFlagged ? [OLSKLocalized('LCHComposeMasterListItemFlaggedAlertText')] : []).concat([
			inputData.LCHDocumentName || inputData.LCHDocumentSignature || OLSKLocalized('LCHComposeMasterListItemUntitledText')]).join('\n');
	},

	LCHComposeMasterListItemTitle (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		return inputData.LCHDocumentName || inputData.LCHDocumentSignature || inputData.LCHDocumentID;
	},

};

Object.assign(exports, mod);
