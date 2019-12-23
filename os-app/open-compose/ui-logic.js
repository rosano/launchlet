const mod = {

	LCHComposeSort (a, b) {
		if (a.LCHDocumentModificationDate && b.LCHDocumentModificationDate) {
			return b.LCHDocumentModificationDate - a.LCHDocumentModificationDate;
		}

		return b.LCHDocumentCreationDate - a.LCHDocumentCreationDate;
	},

	LCHComposeFilterFunction (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return function (e) {
			return [e.LCHDocumentName, e.LCHDocumentSignature].filter(function (e) {
				if (!e) {
					return false;
				}

				return e.toLowerCase().match(inputData.toLowerCase());
			}).length;
		};
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

Object.assign(exports, mod);
