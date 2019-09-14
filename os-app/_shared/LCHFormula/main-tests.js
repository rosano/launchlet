import { throws, rejects, deepEqual } from 'assert';

import { LCHFormulaModelErrorsFor } from './main.js';

describe('LCHFormulaModelErrorsFor', function testLCHFormulaModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			LCHFormulaModelErrorsFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns null', function() {
		deepEqual(LCHFormulaModelErrorsFor({}), null);
	});

	it('returns object if LCHOptionValidateIfNotPresent', function() {
		deepEqual(Array.isArray(Object.keys(LCHFormulaModelErrorsFor({}, {
			LCHOptionValidateIfNotPresent: true,
		}))), true);
	});

	context('LCHFormulaName', function() {

		it('returns object if not string', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaName: null,
			}), {
				LCHFormulaName: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaName: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaSignature', function() {

		it('returns object if not string', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaSignature: null,
			}), {
				LCHFormulaSignature: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaSignature: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaInputTypes', function() {

		it('returns object if not string', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaInputTypes: null,
			}), {
				LCHFormulaInputTypes: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaInputTypes: 'alfa',
			}), null);
		});

		it('allows comma', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaInputTypes: 'alfa,bravo',
			}), null);
		});

	});

	context('LCHFormulaOutputType', function() {

		it('returns object if not string', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaOutputType: null,
			}), {
				LCHFormulaOutputType: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaOutputType: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaIsVisible', function() {

		it('returns object if not function', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaIsVisible: null,
			}), {
				LCHFormulaIsVisible: [
					'LCHErrorNotFunction',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaIsVisible () {},
			}), null);
		});

	});

	context('LCHFormulaURLFilter', function() {

		it('returns object if not string', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaURLFilter: null,
			}), {
				LCHFormulaURLFilter: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaURLFilter: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaIsAutomatic', function() {

		it('returns object if not boolean', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaIsAutomatic: null,
			}), {
				LCHFormulaIsAutomatic: [
					'LCHErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaIsAutomatic: true,
			}), null);
		});

	});

	context('LCHFormulaStyle', function() {

		it('returns object if not string', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaStyle: null,
			}), {
				LCHFormulaStyle: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaStyle: 'alfa',
			}), null);
		});

	});

});

import { LCHFormulaFrom } from './main.js';

describe('LCHFormulaFrom', function testLCHFormulaFrom() {

	it('throws error if not object', function() {
		throws(function() {
			LCHFormulaFrom(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns inputData', function() {
		deepEqual(LCHFormulaFrom({}), {});
	});

	it('replaces domain', function() {
		deepEqual(LCHFormulaFrom({
			LCHAlfaBravo: '',
		}), {
			LCHFormulaBravo: '',
		});
	});

});

import { LCHFormulaTo } from './main.js';

describe('LCHFormulaTo', function testLCHFormulaTo() {

	it('throws error if not object', function() {
		throws(function() {
			LCHFormulaTo(null, '');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			LCHFormulaTo({}, null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns inputData', function() {
		deepEqual(LCHFormulaTo({}, ''), {});
	});

	it('replaces domain and prefix', function() {
		deepEqual(LCHFormulaTo({
			LCHFormulaAlfa: '',
		}, 'bravo'), {
			bravoAlfa: '',
		});
	});

});
