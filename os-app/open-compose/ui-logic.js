import OLSKString from 'OLSKString';

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	LCHComposeAccessibilitySummary (inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.LCHDocumentName || inputData.LCHDocumentSignature || (inputData.LCHDocumentIsFlagged ? [OLSKLocalized('LCHComposeListItemFlaggedAlertText')] : []).concat(OLSKLocalized('LCHComposeListItemUntitledText')).join(' '));
	},

	LCHComposeSortFunction (a, b) {
		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['LCHDocumentModificationDate', 'LCHDocumentCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

	LCHComposeIsMatch (param1, param2) {
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

	LCHComposeExactSortFunction (needle, a, b) {
		if (typeof needle !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return ['LCHDocumentName', 'LCHDocumentSignature'].reduce(function (coll, item) {
			return coll.concat(uDescending(OLSKString.OLSKStringMatch(needle, a[item] || '', 'startsWith'), OLSKString.OLSKStringMatch(needle, b[item] || '', 'startsWith')));
		}, []).filter(function (e) {
			return e !== 0;
		}).shift() || 0;
	},

	LCHComposeCloned (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		const outputData = Object.assign({}, inputData);

		delete outputData.LCHDocumentID;

		return outputData;
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
