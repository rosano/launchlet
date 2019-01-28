const assert = require('assert');

const d3SelectionPackage = require('d3-selection');

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

describe('LCHLogicFilter', function testLCHLogicFilter() {

	it('throws error if not string', function() {
		assert.throws(function() {
			LCHCompile.LCHLogicFilter(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns function', function() {
		assert.strictEqual(typeof LCHCompile.LCHLogicFilter('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if match id', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('alfa')({
				id: 'alfa',
			}), false);
		});

		it('returns false if match fn', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('alfa')({
				fn: function () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match name', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('alfa')({
				name: 'bravo',
			}), false);
		});

		it('returns false if no match labels', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('alfa')({
				labels: [
					'bravo',
				],
			}), false);
		});

		it('returns true if match name', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('alfa')({
				name: 'alfa',
			}), true);
		});

		it('returns true if match labels', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('alfa')({
				labels: [
					'alfa',
				],
			}), true);
		});

		it('returns true if match partial', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('alf')({
				name: 'alfa',
			}), true);
		});

		it('returns true if alternate case', function() {
			assert.strictEqual(LCHCompile.LCHLogicFilter('ALF')({
				name: 'alfa',
			}), true);
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

describe('LCHBoomarkletTokens', function testLCHBoomarkletTokens() {

	it('returns array', function() {
		assert.deepEqual(LCHCompile.LCHBoomarkletTokens(), [
			'__LCHTokenLibraryD3__',
			'__LCHTokenLCHLogicFilter__',
			'__LCHTokenMemberObjects__',
			]);
	});

});

describe('LCHBoomarkletTemplate', function testLCHBoomarkletTemplate() {

	it('contains LCHBoomarkletTokens', function() {
		assert.deepEqual(LCHCompile.LCHBoomarkletTokens().filter(function (e) {
			return !LCHCompile.LCHBoomarkletTemplate.toString().match(e);
		}), []);
	});

});

describe('_LCHBoomarkletReplacementForMemberObjects', function test_LCHBoomarkletReplacementForMemberObjects() {

	it('throws error if not array', function() {
		assert.throws(function() {
			LCHCompile._LCHUnescapedBookmarkletForReplacementHash(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns empty if no objects', function() {
		assert.deepEqual(LCHCompile._LCHBoomarkletReplacementForMemberObjects([]), '[]');
	});

	it('returns stringified if single', function() {
		assert.deepEqual(LCHCompile._LCHBoomarkletReplacementForMemberObjects([LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMember())]), JSON.stringify([LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMember())]).replace('"fnclosure"', '"fn"').replace('"function () { return; }"', 'function () { return; }'));
	});

});

describe('_LCHUnescapedBookmarkletForReplacementHash', function test_LCHUnescapedBookmarkletForReplacementHash() {

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile._LCHUnescapedBookmarkletForReplacementHash(null);
		}, /LCHErrorInvalidInput/);
	});

	it('replaces tokens', function() {
		assert.deepEqual(LCHCompile._LCHUnescapedBookmarkletForReplacementHash({
			LCHToken: 'alfa',
		}), LCHCompile.LCHBoomarkletTemplate.toString().replace('LCHToken', 'alfa'));
	});

});

describe('LCHUnescapedBookmarkletFor', function testLCHUnescapedBookmarkletFor() {

	it('throws error if not array', function() {
		assert.throws(function() {
			LCHCompile.LCHUnescapedBookmarkletFor(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns string', function() {
		assert.strictEqual(LCHCompile.LCHUnescapedBookmarkletFor([]), LCHCompile._LCHUnescapedBookmarkletForReplacementHash({
			'__LCHTokenLibraryD3__': d3SelectionPackage.toString(),
			'__LCHTokenLCHLogicFilter__': LCHCompile.LCHLogicFilter.toString(),
			'__LCHTokenMemberObjects__': LCHCompile._LCHBoomarkletReplacementForMemberObjects([]),
		}));
	});

});
