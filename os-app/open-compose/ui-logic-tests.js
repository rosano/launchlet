const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('LCHComposeSort', function test_LCHComposeSort() {
	
	const item1 = {
		LCHDocumentModificationDate: new Date(0),
	};
	const item2 = {
		LCHDocumentModificationDate: new Date(1),
	};

	it('sorts by LCHDocumentModificationDate descending', function() {
		deepEqual([item1, item2].sort(mod.LCHComposeSort), [item2, item1]);
	});

	it('sorts by LCHDocumentCreationDate descending if no LCHDocumentModificationDate', function() {
		deepEqual([item1, item2].sort(mod.LCHComposeSort), [item2, item1]);
	});

});

describe('LCHComposeFilterFunction', function test_LCHComposeFilterFunction() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHComposeFilterFunction(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns function', function() {
		deepEqual(typeof mod.LCHComposeFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		context('LCHDocumentCallbackBody', function () {
			
			it('returns false', function() {
				deepEqual(mod.LCHComposeFilterFunction('alfa')({
					LCHDocumentCallbackBody: "return 'alfa';",
				}), false);
			});
		
		});

		context('LCHDocumentName', function () {
			
			it('returns false if no match', function() {
				deepEqual(mod.LCHComposeFilterFunction('bravo')({
					LCHDocumentName: 'alfa',
				}), false);
			});

			it('returns true', function() {
				deepEqual(mod.LCHComposeFilterFunction('alfa')({
					LCHDocumentName: 'alfa',
				}), true);
			});

			it('matches partial', function() {
				deepEqual(mod.LCHComposeFilterFunction('alf')({
					LCHDocumentName: 'alfa',
				}), true);
			});

			it('matches case insensitive', function() {
				deepEqual(mod.LCHComposeFilterFunction('ALF')({
					LCHDocumentName: 'alfa',
				}), true);
			});
		
		});

		context('LCHDocumentSignature', function () {
			
			it('returns false if no match', function() {
				deepEqual(mod.LCHComposeFilterFunction('bravo')({
					LCHDocumentSignature: 'alfa',
				}), false);
			});

			it('returns true', function() {
				deepEqual(mod.LCHComposeFilterFunction('alfa')({
					LCHDocumentSignature: 'alfa',
				}), true);
			});

			it('matches partial', function() {
				deepEqual(mod.LCHComposeFilterFunction('alf')({
					LCHDocumentSignature: 'alfa',
				}), true);
			});

			it('matches case insensitive', function() {
				deepEqual(mod.LCHComposeFilterFunction('ALF')({
					LCHDocumentSignature: 'alfa',
				}), true);
			});
		
		});

		context('LCHDocumentURLFilter', function () {
			
			it('returns false if no match', function() {
				deepEqual(mod.LCHComposeFilterFunction('bravo')({
					LCHDocumentURLFilter: 'alfa',
				}), false);
			});

			it('returns true', function() {
				deepEqual(mod.LCHComposeFilterFunction('alfa')({
					LCHDocumentURLFilter: 'alfa',
				}), true);
			});

			it('matches partial', function() {
				deepEqual(mod.LCHComposeFilterFunction('alf')({
					LCHDocumentURLFilter: 'alfa',
				}), true);
			});

			it('matches case insensitive', function() {
				deepEqual(mod.LCHComposeFilterFunction('ALF')({
					LCHDocumentURLFilter: 'alfa',
				}), true);
			});
		
		});
		
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
