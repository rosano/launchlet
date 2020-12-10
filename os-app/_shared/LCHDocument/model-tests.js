const { throws, deepEqual } = require('assert');

const mod = require('./model.js').default;

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			LCHDocumentID: 'alfa',
			LCHDocumentCallbackBody: '',
			LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('LCHDocumentModelErrorsFor', function test_LCHDocumentModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHDocumentModelErrorsFor(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHDocumentID not string', function() {
		deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			LCHDocumentID: null,
		})), {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHDocumentID not filled', function() {
		deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			LCHDocumentID: ' ',
		})), {
			LCHDocumentID: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHDocumentCallbackBody not string', function() {
		deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			LCHDocumentCallbackBody: null,
		})), {
			LCHDocumentCallbackBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHDocumentCreationDate not date', function() {
		deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			LCHDocumentCreationDate: new Date('alfa'),
		})), {
			LCHDocumentCreationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns object if LCHDocumentModificationDate not date', function() {
		deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
			LCHDocumentModificationDate: new Date('alfa'),
		})), {
			LCHDocumentModificationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.LCHDocumentModelErrorsFor(kTesting.StubDocumentObjectValid()), null);
	});

	it('returns object if LCHOptionValidateIfNotPresent', function() {
		deepEqual(Array.isArray(Object.keys(mod.LCHDocumentModelErrorsFor(kTesting.StubDocumentObjectValid(), {
			LCHOptionValidateIfNotPresent: true,
		}))), true);
	});

	context('LCHDocumentCallbackArgs', function() {

		it('returns object if not string', function() {
			deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
				LCHDocumentCallbackArgs: null,
			})), {
				LCHDocumentCallbackArgs: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
				LCHDocumentCallbackArgs: 'alfa',
			})), null);
		});

	});

	context('LCHDocumentSyntaxErrorMessage', function() {

		it('returns object if not string', function() {
			deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
				LCHDocumentSyntaxErrorMessage: null,
			})), {
				LCHDocumentSyntaxErrorMessage: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
				LCHDocumentSyntaxErrorMessage: 'alfa',
			})), null);
		});

	});

	context('LCHDocumentCanonicalExampleCallbackBody', function() {

		it('returns object if not string', function() {
			deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
				LCHDocumentCanonicalExampleCallbackBody: null,
			})), {
				LCHDocumentCanonicalExampleCallbackBody: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHDocumentModelErrorsFor(Object.assign(kTesting.StubDocumentObjectValid(), {
				LCHDocumentCanonicalExampleCallbackBody: '',
			})), null);
		});

	});

});
