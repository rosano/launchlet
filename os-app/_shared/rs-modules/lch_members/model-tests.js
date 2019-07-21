import { throws, deepEqual } from 'assert';

import * as mainModule from './model.js';

const kTesting = {
	StubMemberObjectValid: function() {
		return {
			LCHMemberID: 'alfa',
			LCHMemberArgs: 'bravo',
			LCHMemberBody: 'charlie',
			LCHMemberCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHMemberModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('LCHMembersModelErrorsFor', function testLCHMembersModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHMembersModelErrorsFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object if LCHMemberID not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
			LCHMemberID: null,
		})), {
			LCHMemberID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHMemberID not filled', function() {
		deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
			LCHMemberID: ' ',
		})), {
			LCHMemberID: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHMemberArgs not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
			LCHMemberArgs: null,
		})), {
			LCHMemberArgs: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHMemberBody not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
			LCHMemberBody: null,
		})), {
			LCHMemberBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHMemberCreationDate not date', function() {
		deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
			LCHMemberCreationDate: new Date('alfa'),
		})), {
			LCHMemberCreationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns object if LCHMemberModificationDate not date', function() {
		deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
			LCHMemberModificationDate: new Date('alfa'),
		})), {
			LCHMemberModificationDate: [
				'LCHErrorNotDate',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHMembersModelErrorsFor(kTesting.StubMemberObjectValid()), null);
	});

	context('LCHMemberName', function() {

		it('returns object if LCHMemberName not string', function() {
			deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
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
			deepEqual(mainModule.LCHMembersModelErrorsFor(Object.assign(kTesting.StubMemberObjectValid(), {
				LCHMemberSignature: null,
			})), {
				LCHMemberSignature: [
					'LCHErrorNotString',
				],
			});
		});

	});

});

describe('LCHMembersModelPreJSONSchemaValidate', function testLCHMembersModelPreJSONSchemaValidate() {

	it('returns input', function() {
		deepEqual(mainModule.LCHMembersModelPreJSONSchemaValidate({}), {});
	});

	it('returns input with LCHMemberCreationDate as string', function() {
		deepEqual(mainModule.LCHMembersModelPreJSONSchemaValidate({
			LCHMemberCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			LCHMemberCreationDate: '2018-12-09T19:07:01.902Z',
		});
	});

	it('returns input with LCHMemberModificationDate as string', function() {
		deepEqual(mainModule.LCHMembersModelPreJSONSchemaValidate({
			LCHMemberModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		}), {
			LCHMemberModificationDate: '2018-12-09T19:07:01.902Z',
		});
	});

});

describe('LCHMembersModelPostJSONParse', function testLCHMembersModelPostJSONParse() {

	it('returns input null', function() {
		deepEqual(mainModule.LCHMembersModelPostJSONParse(null), null);
	});

	it('returns input object', function() {
		deepEqual(mainModule.LCHMembersModelPostJSONParse({}), {});
	});

	it('returns input with LCHMemberCreationDate as date', function() {
		deepEqual(mainModule.LCHMembersModelPostJSONParse({
			LCHMemberCreationDate: '2018-12-09T19:07:01.902Z',
		}), {
			LCHMemberCreationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

	it('returns input with LCHMemberModificationDate as date', function() {
		deepEqual(mainModule.LCHMembersModelPostJSONParse({
			LCHMemberModificationDate: '2018-12-09T19:07:01.902Z',
		}), {
			LCHMemberModificationDate: new Date('2018-12-09T19:07:01.902Z'),
		});
	});

});
