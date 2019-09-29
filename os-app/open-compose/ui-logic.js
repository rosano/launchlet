export const LCHComposeFilterFunction = function (inputData) {
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
};

export const LCHComposeSort = function (a, b) {
	if (a.LCHDocumentModificationDate && b.LCHDocumentModificationDate) {
		return b.LCHDocumentModificationDate - a.LCHDocumentModificationDate;
	}

	return b.LCHDocumentCreationDate - a.LCHDocumentCreationDate;
};
