const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('LCHComposeSort', function test_LCHComposeSort() {
	
	const item1 = {
		LCHDocumentModificationDate: new Date(0),
	};
	const item2 = {
		LCHDocumentModificationDate: new Date(1),
	};

	it('sorts by LCHDocumentModificationDate descending', function() {
		deepEqual([item1, item2].sort(mainModule.LCHComposeSort), [item2, item1]);
	});

	it('sorts by LCHDocumentCreationDate descending if no LCHDocumentModificationDate', function() {
		deepEqual([item1, item2].sort(mainModule.LCHComposeSort), [item2, item1]);
	});

});

describe('LCHComposeFilterFunction', function test_LCHComposeFilterFunction() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposeFilterFunction(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHComposeFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		context('LCHDocumentCallbackBody', function () {
			
			it('returns false', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
					LCHDocumentCallbackBody: "return 'alfa';",
				}), false);
			});
		
		});

		context('LCHDocumentName', function () {
			
			it('returns false if no match', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('bravo')({
					LCHDocumentName: 'alfa',
				}), false);
			});

			it('returns true', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
					LCHDocumentName: 'alfa',
				}), true);
			});

			it('matches partial', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('alf')({
					LCHDocumentName: 'alfa',
				}), true);
			});

			it('matches case insensitive', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('ALF')({
					LCHDocumentName: 'alfa',
				}), true);
			});
		
		});

		context('LCHDocumentSignature', function () {
			
			it('returns false if no match', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('bravo')({
					LCHDocumentSignature: 'alfa',
				}), false);
			});

			it('returns true', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
					LCHDocumentSignature: 'alfa',
				}), true);
			});

			it('matches partial', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('alf')({
					LCHDocumentSignature: 'alfa',
				}), true);
			});

			it('matches case insensitive', function() {
				deepEqual(mainModule.LCHComposeFilterFunction('ALF')({
					LCHDocumentSignature: 'alfa',
				}), true);
			});
		
		});
		
	});

});

describe('LCHComposePublicKeyIsValid', function test_LCHComposePublicKeyIsValid() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposePublicKeyIsValid(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if empty', function() {
		deepEqual(mainModule.LCHComposePublicKeyIsValid(''), false);
	});

	it('returns false if blank', function() {
		deepEqual(mainModule.LCHComposePublicKeyIsValid(' '), false);
	});

	it('returns false if without braces', function() {
		deepEqual(mainModule.LCHComposePublicKeyIsValid('alfa'), false);
	});

	it('returns false if whitespace leading', function() {
		deepEqual(mainModule.LCHComposePublicKeyIsValid(' {alfa: \'bravo\'}'), false);
	});

	it('returns false if whitespace trailing', function() {
		deepEqual(mainModule.LCHComposePublicKeyIsValid('{alfa: \'bravo\'} '), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHComposePublicKeyIsValid('{}'), true);
	});

});

describe('LBXResponseIsValid', function test_LBXResponseIsVald() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LBXResponseIsValid(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if LBXResponseHash not string', function() {
		deepEqual(mainModule.LBXResponseIsValid({
			LBXResponseHash: null,
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LBXResponseIsValid({
			LBXResponseHash: '',
		}), true);
	});

	context('LBXResponseError', function () {

		it('returns false if not string', function() {
			deepEqual(mainModule.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: null,
			}), false);
		});

		it('returns false if not filled', function() {
			deepEqual(mainModule.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: ' ',
			}), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.LBXResponseIsValid({
				LBXResponseHash: '',
				LBXResponseError: 'alfa',
			}), true);
		});
	
	});

});
