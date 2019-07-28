import { throws, deepEqual } from 'assert';

import * as mainModule from './model.js';

const kTesting = {
	StubFormulaObjectValid: function() {
		return {
			LCHMemberID: 'alfa',
			LCHMemberArgs: 'bravo',
			LCHMemberBody: 'charlie',
			LCHMemberCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHMemberModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('LCHFormulasModelErrorsFor', function testLCHFormulasModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHFormulasModelErrorsFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object if LCHMemberID not string', function() {
		deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHMemberID: null,
		})), {
			LCHMemberID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHMemberID not filled', function() {
		deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHMemberID: ' ',
		})), {
			LCHMemberID: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHMemberArgs not string', function() {
		deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHMemberArgs: null,
		})), {
			LCHMemberArgs: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHMemberBody not string', function() {
		deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHMemberBody: null,
		})), {
			LCHMemberBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHMemberCreationDate not date', function() {
		deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHMemberCreationDate: new Date('alfa'),
		})), {
			LCHMemberCreationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns object if LCHMemberModificationDate not date', function() {
		deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHMemberModificationDate: new Date('alfa'),
		})), {
			LCHMemberModificationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHFormulasModelErrorsFor(kTesting.StubFormulaObjectValid()), null);
	});

	context('LCHMemberName', function() {

		it('returns object if LCHMemberName not string', function() {
			deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
				LCHMemberName: null,
			})), {
				LCHMemberName: [
					'LCHErrorNotString',
				],
			});
		});

	});

	context('LCHMemberSignature', function() {

		it('returns object if LCHMemberSignature not string', function() {
			deepEqual(mainModule.LCHFormulasModelErrorsFor(Object.assign(kTesting.StubFormulaObjectValid(), {
				LCHMemberSignature: null,
			})), {
				LCHMemberSignature: [
					'LCHErrorNotString',
				],
			});
		});

	});

});

describe('LCHFormulasModelPreJSONSchemaValidate', function testLCHFormulasModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.LCHFormulasModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with LCHMemberCreationDate as string', function() {
		deepEqual(mainModule.LCHFormulasModelPreJSONSchemaValidate({
			LCHMemberCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			LCHMemberCreationDate: '2018-12-09T19:07:01.902Z',
		});
	});

	it('returns input with LCHMemberModificationDate as string', function() {
		deepEqual(mainModule.LCHFormulasModelPreJSONSchemaValidate({
			LCHMemberModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			LCHMemberModificationDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('LCHFormulasModelPostJSONParse', function testLCHFormulasModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.LCHFormulasModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.LCHFormulasModelPostJSONParse({}), {});
	});

	it('returns input with LCHMemberCreationDate as date', function() {
		deepEqual(mainModule.LCHFormulasModelPostJSONParse({
			LCHMemberCreationDate: '2018-12-09T19:07:01.902Z',
		}), {
			LCHMemberCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

	it('returns input with LCHMemberModificationDate as date', function() {
		deepEqual(mainModule.LCHFormulasModelPostJSONParse({
			LCHMemberModificationDate: '2018-12-09T19:07:01.902Z',
		}), {
			LCHMemberModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
