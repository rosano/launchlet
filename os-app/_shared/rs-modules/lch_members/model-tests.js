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
	StubUnwrappedMemberObjectValid: function() {
		return {
			id: 'alfa',
			fnbody: 'return;',
		};
	},
	StubWrappedMemberObjectValid: function() {
		return {
			id: 'alfa',
			fn () {},
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

describe('LCHMembersModelErrorsForUnwrappedMemberObject', function testLCHMembersModelErrorsForUnwrappedMemberObject() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHMembersModelErrorsForUnwrappedMemberObject(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns error if id not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.StubUnwrappedMemberObjectValid(), {
			id: null,
		})), {
			id: new Error('LCHErrorNotString'),
		});
	});

	it('returns error if fnbody not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.StubUnwrappedMemberObjectValid(), {
			fnbody: null,
		})), {
			fnbody: new Error('LCHErrorNotString'),
		});
	});

	it('returns empty array', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForUnwrappedMemberObject(kTesting.StubUnwrappedMemberObjectValid()), null);
	});

	it('returns error if args not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.StubUnwrappedMemberObjectValid(), {
			args: null,
		})), {
			args: new Error('LCHErrorNotString'),
		});
	});

	it('returns error if name not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.StubUnwrappedMemberObjectValid(), {
			name: null,
		})), {
			name: new Error('LCHErrorNotString'),
		});
	});

});

describe('LCHMembersModelWrappedMemberObjectFor', function testLCHMembersModelWrappedMemberObjectFor() {

	it('throws error if not UnwrappedMemberObject', function() {
		throws(function() {
			mainModule.LCHMembersModelWrappedMemberObjectFor({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns WrappedMemberObject', function() {
		deepEqual(mainModule.LCHMembersModelWrappedMemberObjectFor(kTesting.StubUnwrappedMemberObjectValid()), {
			id: kTesting.StubUnwrappedMemberObjectValid().id,
			fnclosure: 'function () { return; }',
		});
	});

	context('id', function () {

		it('copies', function() {
			deepEqual(mainModule.LCHMembersModelWrappedMemberObjectFor(kTesting.StubUnwrappedMemberObjectValid()).id, kTesting.StubUnwrappedMemberObjectValid().id);
		});

	});

	context('fnclosure', function () {

		it('wraps fnbody', function() {
			deepEqual(mainModule.LCHMembersModelWrappedMemberObjectFor(kTesting.StubUnwrappedMemberObjectValid()).fnclosure, `function () { ${ kTesting.StubUnwrappedMemberObjectValid().fnbody } }`);
		});

		it('wraps args', function() {
			deepEqual(mainModule.LCHMembersModelWrappedMemberObjectFor(Object.assign(kTesting.StubUnwrappedMemberObjectValid(), {
				args: 'alfa',
			})).fnclosure, `function (alfa) { ${ kTesting.StubUnwrappedMemberObjectValid().fnbody } }`);
		});

	});

});

describe('LCHMembersModelErrorsForFormulaObject', function testLCHMembersModelErrorsForFormulaObject() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHMembersModelErrorsForFormulaObject(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns error if id not string', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForFormulaObject(Object.assign(kTesting.StubWrappedMemberObjectValid(), {
			id: null,
		})), {
			id: new Error('LCHErrorNotString'),
		});
	});

	it('returns error if fn not function', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForFormulaObject(Object.assign(kTesting.StubWrappedMemberObjectValid(), {
			fn: null,
		})), {
			fn: new Error('LCHErrorNotFunction'),
		});
	});

	it('returns empty array', function() {
		deepEqual(mainModule.LCHMembersModelErrorsForFormulaObject(kTesting.StubWrappedMemberObjectValid()), null);
	});

});
