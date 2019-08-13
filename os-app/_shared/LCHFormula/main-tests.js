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

	context('LCHFormulaTitle', function() {

		it('returns object if LCHFormulaTitle not string', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaTitle: null,
			}), {
				LCHFormulaTitle: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(LCHFormulaModelErrorsFor({
				LCHFormulaTitle: 'alfa',
			}), null);
		});

	});

	context('LCHFormulaSignature', function() {

		it('returns object if LCHFormulaSignature not string', function() {
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

	context('LCHFormulaURLFilter', function() {

		it('returns object if LCHFormulaURLFilter not string', function() {
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

});