const assert = require('assert');

const LCHCompile = require('./main.js');

const kTesting = {
	kTestingValidMember: function() {
		return {
			id: 'alfa',
			fnbody: 'return;',
		};
	},
};

describe('LCHModelErrorsForUnwrappedMemberObject', function testLCHModelErrorsForUnwrappedMemberObject() {

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHModelErrorsForUnwrappedMemberObject(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns error if id not string', function() {
		assert.deepEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.kTestingValidMember(), {
			id: null,
		})), {
			id: new Error('LCHErrorNotString'),
		});
	});

	it('returns error if fnbody not string', function() {
		assert.deepEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.kTestingValidMember(), {
			fnbody: null,
		})), {
			fnbody: new Error('LCHErrorNotString'),
		});
	});

	it('returns empty array', function() {
		assert.strictEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(kTesting.kTestingValidMember()), null);
	});

	it('returns error if name not string', function() {
		assert.deepEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.kTestingValidMember(), {
			name: null,
		})), {
			name: new Error('LCHErrorNotString'),
		});
	});

});

describe('LCHWrappedMemberObjectFor', function testLCHWrappedMemberObjectFor() {

	it('throws error if not UnwrappedMemberObject', function() {
		assert.throws(function() {
			LCHCompile.LCHWrappedMemberObjectFor({});
		}, /LCHErrorInvalidInput/);
	});

	it('returns WrappedMemberObject', function() {
		assert.deepEqual(LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMember()), {
			id: kTesting.kTestingValidMember().id,
			fnclosure: 'function () { return; }',
		});
	});

});

describe('LCHUnescapedBookmarkletForWrappedMemberObjects', function testLCHUnescapedBookmarkletForWrappedMemberObjects() {

	it('throws error if not array', function() {
		assert.throws(function() {
			LCHCompile.LCHUnescapedBookmarkletForWrappedMemberObjects(kTesting.kTestingValidMember());
		}, /LCHErrorInvalidInput/);
	});

	it('returns string', function() {
		assert.deepEqual(LCHCompile.LCHUnescapedBookmarkletForWrappedMemberObjects([LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMember())]), LCHCompile.LCHBoomarkletTemplate.toString().replace('[]', JSON.stringify([LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMember())]).replace('"fnclosure"', '"fn"').replace('"function () { return; }"', 'function () { return; }')));
	});

});
