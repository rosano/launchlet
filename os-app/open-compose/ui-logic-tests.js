const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('LCHComposeAccessibilitySummary', function test_LCHComposeAccessibilitySummary() {

	it('throws if not object', function () {
		throws(function () {
			mod.LCHComposeAccessibilitySummary(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = Math.random().toString();
		deepEqual(mod.LCHComposeAccessibilitySummary(StubDocumentObjectValid({
			[uRandomElement('LCHDocumentName', 'LCHDocumentSignature')]: item,
		})), item);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.LCHComposeAccessibilitySummary(StubDocumentObjectValid({
			[uRandomElement('LCHDocumentName', 'LCHDocumentSignature')]: item,
		})), require('OLSKString').OLSKStringSnippet(item));
	});

	it('prefers LCHDocumentName', function() {
		const LCHDocumentName = Math.random().toString();
		deepEqual(mod.LCHComposeAccessibilitySummary(StubDocumentObjectValid({
			LCHDocumentName,
			LCHDocumentSignature: Math.random().toString(),
		})), LCHDocumentName);
	});

	it('returns LCHComposeListItemUntitledText if no LCHDocumentSignature', function() {
		deepEqual(mod.LCHComposeAccessibilitySummary(StubDocumentObjectValid({
			LCHDocumentSignature: undefined,
		}), uLocalized), uLocalized('LCHComposeListItemUntitledText'));
	});
	
	it('includes LCHComposeListItemFlaggedAlertText if LCHDocumentIsFlagged', function() {
		deepEqual(mod.LCHComposeAccessibilitySummary(StubDocumentObjectValid({
			LCHDocumentSignature: undefined,
			LCHDocumentIsFlagged: true,
		}), uLocalized), [uLocalized('LCHComposeListItemFlaggedAlertText'), uLocalized('LCHComposeListItemUntitledText')].join(' '));
	});

});

describe('LCHComposeSortFunction', function test_LCHComposeSortFunction() {
	
	const item1 = {
		LCHDocumentModificationDate: new Date(0),
	};
	const item2 = {
		LCHDocumentModificationDate: new Date(1),
	};

	it('sorts by LCHDocumentModificationDate descending', function() {
		deepEqual([item1, item2].sort(mod.LCHComposeSortFunction), [item2, item1]);
	});

	it('sorts by LCHDocumentCreationDate descending if no LCHDocumentModificationDate', function() {
		deepEqual([item1, item2].sort(mod.LCHComposeSortFunction), [item2, item1]);
	});

});

describe('LCHComposeMatchIsResult', function test_LCHComposeMatchIsResult() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.LCHComposeMatchIsResult({}, null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		deepEqual(mod.LCHComposeMatchIsResult({
			[uRandomElement('LCHDocumentName', 'LCHDocumentSignature', 'LCHDocumentURLFilter')]: 'alfa',
		}, 'bravo'), false);
	});

	it('returns false if match LCHDocumentCallbackBody', function() {
		deepEqual(mod.LCHComposeMatchIsResult({
			LCHDocumentCallbackBody: 'alfa',
		}, 'alfa'), false);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.LCHComposeMatchIsResult({
			[uRandomElement('LCHDocumentName', 'LCHDocumentSignature', 'LCHDocumentURLFilter')]: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('LCHComposeMatchIsExact', function test_LCHComposeMatchIsExact() {

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.LCHComposeMatchIsExact({}, null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if not starting with input', function() {
		const item = Math.random().toString();
		deepEqual(mod.LCHComposeMatchIsExact({
			[uRandomElement('LCHDocumentName', 'LCHDocumentSignature')]: Math.random().toString() + item,
		}, item), false);
	});

	it('returns true', function() {
		const item = Math.random().toString();
		deepEqual(mod.LCHComposeMatchIsExact({
			[uRandomElement('LCHDocumentName', 'LCHDocumentSignature')]: item + Math.random().toString(),
		}, item), true);
	});

	it('matches OLSKStringMatch', function() {
		deepEqual(mod.LCHComposeMatchIsExact({
			[uRandomElement('LCHDocumentName', 'LCHDocumentSignature')]: uRandomElement('alfa', 'álfa'),
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('LCHComposePublicKeyIsValid', function test_LCHComposePublicKeyIsValid() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHComposePublicKeyIsValid(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if empty', function() {
		deepEqual(mod.LCHComposePublicKeyIsValid(''), false);
	});

	it('returns false if blank', function() {
		deepEqual(mod.LCHComposePublicKeyIsValid(' '), false);
	});

	it('returns false if without braces', function() {
		deepEqual(mod.LCHComposePublicKeyIsValid('alfa'), false);
	});

	it('returns false if whitespace leading', function() {
		deepEqual(mod.LCHComposePublicKeyIsValid(' {alfa: \'bravo\'}'), false);
	});

	it('returns false if whitespace trailing', function() {
		deepEqual(mod.LCHComposePublicKeyIsValid('{alfa: \'bravo\'} '), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHComposePublicKeyIsValid('{}'), true);
	});

});

describe('LBXResponseIsValid', function test_LBXResponseIsVald() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LBXResponseIsValid(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if LBXResponseHash not string', function() {
		deepEqual(mod.LBXResponseIsValid({
			LBXResponseHash: null,
		}), false);
	});

	it('returns true', function() {
		deepEqual(mod.LBXResponseIsValid({
			LBXResponseHash: '',
		}), true);
	});

	context('LBXResponseError', function () {

		it('returns false if not string', function() {
			deepEqual(mod.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: null,
			}), false);
		});

		it('returns false if not filled', function() {
			deepEqual(mod.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: ' ',
			}), false);
		});

		it('returns true', function() {
			deepEqual(mod.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: 'alfa',
			}), true);
		});
	
	});

});
