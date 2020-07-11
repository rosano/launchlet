const { throws, rejects, deepEqual } = require('assert');

const mainModule = require('./main.js').default;

describe('LCHFormulaModelErrorsFor', function test_LCHFormulaModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHFormulaModelErrorsFor(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHFormulaModelErrorsFor({}), null);
	});

	it('returns object if LCHOptionValidateIfNotPresent', function() {
		deepEqual(Array.isArray(Object.keys(mainModule.LCHFormulaModelErrorsFor({}, {
			LCHOptionValidateIfNotPresent: true,
		}))), true);
	});

	context('LCHFormulaName', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaName: null,
			}), {
				LCHFormulaName: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaName: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaSignature', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaSignature: null,
			}), {
				LCHFormulaSignature: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaSignature: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaInputTypes', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaInputTypes: null,
			}), {
				LCHFormulaInputTypes: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaInputTypes: 'alfa',
			}), null);
		});

		it('allows comma', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaInputTypes: 'alfa,bravo',
			}), null);
		});

	});

	context('LCHFormulaOutputType', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaOutputType: null,
			}), {
				LCHFormulaOutputType: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaOutputType: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaIsHidden', function() {

		it('returns object if not function', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaIsHidden: null,
			}), {
				LCHFormulaIsHidden: [
					'LCHErrorNotFunction',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaIsHidden () {},
			}), null);
		});

	});

	context('LCHFormulaURLFilter', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaURLFilter: null,
			}), {
				LCHFormulaURLFilter: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaURLFilter: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaIsAutomatic', function() {

		it('returns object if not boolean', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaIsAutomatic: null,
			}), {
				LCHFormulaIsAutomatic: [
					'LCHErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaIsAutomatic: true,
			}), null);
		});

	});

	context('LCHFormulaStyle', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaStyle: null,
			}), {
				LCHFormulaStyle: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaStyle: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaIsFlagged', function() {

		it('returns object if not boolean', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaIsFlagged: null,
			}), {
				LCHFormulaIsFlagged: [
					'LCHErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHFormulaModelErrorsFor({
				LCHFormulaIsFlagged: true,
			}), null);
		});

	});

});

describe('LCHFormulaFrom', function test_LCHFormulaFrom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHFormulaFrom(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns inputData', function() {
		deepEqual(mainModule.LCHFormulaFrom({}), {});
	});

	it('replaces domain', function() {
		deepEqual(mainModule.LCHFormulaFrom({
			LCHAlfaBravo: '',
		}), {
			LCHFormulaBravo: '',
		});
	});

});

describe('LCHFormulaTo', function test_LCHFormulaTo() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHFormulaTo(null, '');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHFormulaTo({}, null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns inputData', function() {
		deepEqual(mainModule.LCHFormulaTo({}, ''), {});
	});

	it('replaces domain and prefix', function() {
		deepEqual(mainModule.LCHFormulaTo({
			LCHFormulaAlfa: '',
		}, 'bravo'), {
			bravoAlfa: '',
		});
	});

});

describe('LCHFormulaSafeStringFields', function test_LCHFormulaSafeStringFields() {

	it('prefixes fields with with LCHFormula', function() {
		deepEqual(mainModule.LCHFormulaSafeStringFields.filter(function (e) {
			if (e === '@context') {
				return false;
			};

			return e.indexOf('LCHFormula') !== 0;
		}), []);
	});

});

describe('LCHFormulaToEvaluate', function test_LCHFormulaToEvaluate() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHFormulaToEvaluate({
				LCHFormulaName: null,
			});
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mainModule.LCHFormulaToEvaluate({}), {});
	});

	it('removes LCHFormulaSafeStringFields', function() {
		deepEqual(mainModule.LCHFormulaToEvaluate(mainModule.LCHFormulaSafeStringFields.reduce(function (coll, item) {
			coll[item] = 'alfa';
			return coll;
		}, {})), {});
	});

	it('adds closure from LCHFormulaCallbackArgs', function() {
		deepEqual(mainModule.LCHFormulaToEvaluate({
			LCHFormulaCallbackArgs: 'alfa',
		}), {
			LCHFormulaCallbackRaw: '(function (alfa) {  })',
		});
	});

	it('adds closure from LCHFormulaCallbackArgs', function() {
		deepEqual(mainModule.LCHFormulaToEvaluate({
			LCHFormulaCallbackBody: 'alfa',
		}), {
			LCHFormulaCallbackRaw: '(function () { alfa })',
		});
	});

	it('adds closure from LCHFormulaCanonicalExampleCallbackBody', function() {
		deepEqual(mainModule.LCHFormulaToEvaluate({
			LCHFormulaCanonicalExampleCallbackBody: 'alfa',
		}), {
			LCHFormulaCanonicalExampleCallbackRaw: '(function () { alfa })',
		});
	});

	it('does not modify input', function() {
		const item = {};
		deepEqual(mainModule.LCHFormulaToEvaluate(item) !== item, true);
	});

});
