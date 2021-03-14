import OLSKString from 'OLSKString';

const mod = {

	LCHComposeAccessibilitySummary (inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.LCHDocumentName || inputData.LCHDocumentSignature || (inputData.LCHDocumentIsFlagged ? [OLSKLocalized('LCHComposeListItemFlaggedAlertText')] : []).concat(OLSKLocalized('LCHComposeListItemUntitledText')).join(' '));
	},

	LCHComposeSortFunction (a, b) {
		if (a.LCHDocumentModificationDate && b.LCHDocumentModificationDate) {
			return b.LCHDocumentModificationDate - a.LCHDocumentModificationDate;
		}

		return b.LCHDocumentCreationDate - a.LCHDocumentCreationDate;
	},

	LCHComposeFilterFunction (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return [param1.LCHDocumentName, param1.LCHDocumentSignature, param1.LCHDocumentURLFilter].filter(function (e) {
			if (!e) {
				return false;
			}

			return OLSKString.OLSKStringMatch(param2, e);
		}).length;
	},

	LCHComposeMatchIsExact (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return [param1.LCHDocumentName, param1.LCHDocumentSignature].filter(function (e) {
			if (!e) {
				return false;
			}

			return OLSKString.OLSKStringMatch(param2, e, 'startsWith');
		}).length;
	},

	LCHComposePublicKeyIsValid (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (inputData[0] !== '{') {
			return false;
		}

		if (inputData.slice(-1) !== '}') {
			return false;
		}

		return true;
	},

	LBXResponseIsValid (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof inputData.LBXResponseHash !== 'string') {
			return false;
		}
		
		if (typeof inputData.LBXResponseError !== 'undefined') {
			if (typeof inputData.LBXResponseError !== 'string') {
				return false;
			}

			if (!inputData.LBXResponseError.trim()) {
				return false;
			}
		}
		
		return true;
	},

};

export default mod;
