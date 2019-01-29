const assert = require('assert');

const LCHCompile = require('./main.js');

const kTesting = {
	kTestingValidMemberObject: function() {
		return {
			id: 'alfa',
			fnbody: 'return;',
		};
	},
	kTestingValidInputHash: function() {
		return {
			LCHInputMemberObjects: [],
			LCHInputStyleContent: '',
			LCHInputLibraryD3Content: '',
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
		assert.deepEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.kTestingValidMemberObject(), {
			id: null,
		})), {
			id: new Error('LCHErrorNotString'),
		});
	});

	it('returns error if fnbody not string', function() {
		assert.deepEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.kTestingValidMemberObject(), {
			fnbody: null,
		})), {
			fnbody: new Error('LCHErrorNotString'),
		});
	});

	it('returns empty array', function() {
		assert.strictEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(kTesting.kTestingValidMemberObject()), null);
	});

	it('returns error if args not string', function() {
		assert.deepEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.kTestingValidMemberObject(), {
			args: null,
		})), {
			args: new Error('LCHErrorNotString'),
		});
	});

	it('returns error if name not string', function() {
		assert.deepEqual(LCHCompile.LCHModelErrorsForUnwrappedMemberObject(Object.assign(kTesting.kTestingValidMemberObject(), {
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
		assert.deepEqual(LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMemberObject()), {
			id: kTesting.kTestingValidMemberObject().id,
			fnclosure: 'function () { return; }',
		});
	});

	context('id', function () {

		it('copies', function() {
			assert.deepEqual(LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMemberObject()).id, kTesting.kTestingValidMemberObject().id);
		});

	});

	context('fnclosure', function () {

		it('wraps fnbody', function() {
			assert.deepEqual(LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMemberObject()).fnclosure, `function () { ${ kTesting.kTestingValidMemberObject().fnbody } }`);
		});

		it('wraps args', function() {
			assert.deepEqual(LCHCompile.LCHWrappedMemberObjectFor(Object.assign(kTesting.kTestingValidMemberObject(), {
				args: 'alfa',
			})).fnclosure, `function (alfa) { ${ kTesting.kTestingValidMemberObject().fnbody } }`);
		});

	});

});

describe('LCHBoomarkletTemplate', function testLCHBoomarkletTemplate() {

	it('contains LCHTokens', function() {
		assert.deepEqual(Object.keys(LCHCompile.LCHBoomarkletReplacementHashFor(kTesting.kTestingValidInputHash())).filter(function (e) {
			return !LCHCompile.LCHBoomarkletTemplate.toString().match(e);
		}), []);
	});

});

describe('LCHBoomarkletReplacementHashFor', function testLCHBoomarkletReplacementHashFor() {	

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHBoomarkletReplacementHashFor(null);
		}, /LCHErrorInvalidInput/);
	});

	it('throws error if LCHInputMemberObjects not array', function() {
		assert.throws(function() {
			LCHCompile.LCHBoomarkletReplacementHashFor(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputMemberObjects: null,
			}));
		}, /LCHErrorInvalidInput/);
	});

	it('throws error if LCHInputStyleContent not string', function() {
		assert.throws(function() {
			LCHCompile.LCHBoomarkletReplacementHashFor(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputStyleContent: null,
			}));
		}, /LCHErrorInvalidInput/);
	});

	it('throws error if LCHInputLibraryD3Content not string', function() {
		assert.throws(function() {
			LCHCompile.LCHBoomarkletReplacementHashFor(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputLibraryD3Content: null,
			}));
		}, /LCHErrorInvalidInput/);
	});

	it('returns array', function() {
		assert.deepEqual(LCHCompile.LCHBoomarkletReplacementHashFor(kTesting.kTestingValidInputHash()), {
			'__LCHTokenStyle__': kTesting.kTestingValidInputHash().LCHInputStyleContent,
			'__LCHTokenLibraryD3__': kTesting.kTestingValidInputHash().LCHInputLibraryD3Content,
			'__LCHTokenLCHLogicFilter__': LCHCompile.LCHLogicFilter.toString(),
			'__LCHTokenMemberObjects__': LCHCompile._LCHTokenMemberObjectsReplacementFor(kTesting.kTestingValidInputHash().LCHInputMemberObjects),
		});
	});

});

describe('_LCHBoomarkletReplacementForLibraryD3', function test_LCHBoomarkletReplacementForLibraryD3() {

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile._LCHBoomarkletReplacementForLibraryD3(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns stringified', function() {
		let item = {
			alfa: function () { return; },
		};
		assert.deepEqual(LCHCompile._LCHBoomarkletReplacementForLibraryD3(item), '{"alfa":function () { return; }}');
	});

});

describe('_LCHTokenMemberObjectsReplacementFor', function test_LCHTokenMemberObjectsReplacementFor() {

	it('throws error if not array', function() {
		assert.throws(function() {
			LCHCompile._LCHTokenMemberObjectsReplacementFor(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns empty if no objects', function() {
		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([]), '[]');
	});

	it('returns stringified if single', function() {
		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMemberObject())]), JSON.stringify([LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMemberObject())]).replace('"fnclosure"', '"fn"').replace('"function () { return; }"', 'function () { return; }'));
	});

	it('returns stringified if single', function() {
		let item = LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMemberObject());
		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace('"function () { return; }"', 'function () { return; }'));
	});

});

describe('LCHBookmarkletTextForReplacementHash', function testLCHBookmarkletTextForReplacementHash() {

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHBookmarkletTextForReplacementHash(null);
		}, /LCHErrorInvalidInput/);
	});

	it('replaces tokens', function() {
		assert.deepEqual(LCHCompile.LCHBookmarkletTextForReplacementHash({
			LCHToken: 'alfa',
		}), LCHCompile.LCHBoomarkletTemplate.toString().replace('LCHToken', 'alfa'));
	});

});

describe('LCHBookmarkletBinaryFor', function testLCHBookmarkletBinaryFor() {

	it('throws error if not string', function() {
		assert.throws(function() {
			LCHCompile.LCHBookmarkletBinaryFor(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns bookmarklet binary', function() {
		assert.deepEqual(LCHCompile.LCHBookmarkletBinaryFor('function() { return; }'), 'javascript:(function()%20%7B%20return%3B%20%7D)();');
	});

});
