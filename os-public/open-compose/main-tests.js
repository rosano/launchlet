const assert = require('assert');

const LCHCompile = require('./main.js');

const kTesting = {
	kTestingValidMember: function() {
		return {
			id: 'alfa',
			fnbody: 'bravo',
		};
	},
};

describe('LCHMemberModelErrorsFor', function testLCHMemberModelErrorsFor() {

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHMemberModelErrorsFor(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns error if id not string', function() {
		assert.deepEqual(LCHCompile.LCHMemberModelErrorsFor(Object.assign(kTesting.kTestingValidMember(), {
			id: null,
		})), {
			id: new Error('LCHErrorNotString'),
		});
	});

	it('returns error if fnbody not string', function() {
		assert.deepEqual(LCHCompile.LCHMemberModelErrorsFor(Object.assign(kTesting.kTestingValidMember(), {
			fnbody: null,
		})), {
			fnbody: new Error('LCHErrorNotString'),
		});
	});

	it('returns empty array', function() {
		assert.strictEqual(LCHCompile.LCHMemberModelErrorsFor(kTesting.kTestingValidMember()), null);
	});

	it('returns error if name not string', function() {
		assert.deepEqual(LCHCompile.LCHMemberModelErrorsFor(Object.assign(kTesting.kTestingValidMember(), {
			name: null,
		})), {
			name: new Error('LCHErrorNotString'),
		});
	});

});
