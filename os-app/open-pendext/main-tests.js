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
			LCHInputMainApp: '',
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
		}, /LCHErrorInputInvalid/);
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
		}, /LCHErrorInputInvalid/);
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
		}, /LCHErrorInputInvalid/);
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

describe('LCHBoomarkletTemplateNew', function testLCHBoomarkletTemplateNew() {

	it('contains LCHTokens', function() {
		assert.deepEqual(Object.keys(LCHCompile.LCHTokenHashForNew(kTesting.kTestingValidInputHash())).filter(function (e) {
			return !LCHCompile.LCHBoomarkletTemplateNew.toString().match(e);
		}), []);
	});

});

describe('LCHTokenHashForNew', function testLCHTokenHashForNew() {	

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHTokenHashForNew(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHInputMemberObjects not array', function() {
		assert.throws(function() {
			LCHCompile.LCHTokenHashForNew(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputMemberObjects: null,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHInputMainApp not string', function() {
		assert.throws(function() {
			LCHCompile.LCHTokenHashForNew(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputMainApp: null,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		assert.deepEqual(LCHCompile.LCHTokenHashForNew(kTesting.kTestingValidInputHash()), {
			'__LCHTokenMainApp__': kTesting.kTestingValidInputHash().LCHInputMainApp,
			'__LCHTokenMemberObjects__': LCHCompile._LCHTokenMemberObjectsReplacementFor(kTesting.kTestingValidInputHash().LCHInputMemberObjects),
		});
	});

});

describe('LCHBoomarkletTemplate', function testLCHBoomarkletTemplate() {

	it('contains LCHTokens', function() {
		assert.deepEqual(Object.keys(LCHCompile.LCHTokenHashFor(kTesting.kTestingValidInputHash())).filter(function (e) {
			return !LCHCompile.LCHBoomarkletTemplate.toString().match(e);
		}), []);
	});

});

describe('LCHTokenHashFor', function testLCHTokenHashFor() {	

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHTokenHashFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHInputMemberObjects not array', function() {
		assert.throws(function() {
			LCHCompile.LCHTokenHashFor(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputMemberObjects: null,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHInputStyleContent not string', function() {
		assert.throws(function() {
			LCHCompile.LCHTokenHashFor(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputStyleContent: null,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHInputLibraryD3Content not string', function() {
		assert.throws(function() {
			LCHCompile.LCHTokenHashFor(Object.assign(kTesting.kTestingValidInputHash(), {
				LCHInputLibraryD3Content: null,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		assert.deepEqual(LCHCompile.LCHTokenHashFor(kTesting.kTestingValidInputHash()), {
			'__LCHTokenStyle__': kTesting.kTestingValidInputHash().LCHInputStyleContent,
			'__LCHTokenLibraryD3__': kTesting.kTestingValidInputHash().LCHInputLibraryD3Content,
			'__LCHTokenLCHLogicFilter__': LCHCompile.LCHLogicFilter.toString(),
			'__LCHTokenMemberObjects__': LCHCompile._LCHTokenMemberObjectsReplacementFor(kTesting.kTestingValidInputHash().LCHInputMemberObjects),
		});
	});

});

describe('_LCHTokenMemberObjectsReplacementFor', function test_LCHTokenMemberObjectsReplacementFor() {

	it('throws error if not array', function() {
		assert.throws(function() {
			LCHCompile._LCHTokenMemberObjectsReplacementFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns empty if no objects', function() {
		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([]), '[]');
	});

	it('returns stringified if single line', function() {
		let item = LCHCompile.LCHWrappedMemberObjectFor(kTesting.kTestingValidMemberObject());
		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(`"${ item.fnclosure }"`, item.fnclosure));
	});

	it('returns stringified if multi line', function() {
		let item = LCHCompile.LCHWrappedMemberObjectFor(Object.assign(kTesting.kTestingValidMemberObject(), {
			fnbody: `
return;
`,
		}));

		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(/\\n/g, '\n').replace(`"${ item.fnclosure }"`, item.fnclosure));
	});

});

describe('LCHBookmarkletTextForTokenHash', function testLCHBookmarkletTextForTokenHash() {

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHBookmarkletTextForTokenHash(null);
		}, /LCHErrorInputInvalid/);
	});

	it('replaces tokens', function() {
		assert.deepEqual(LCHCompile.LCHBookmarkletTextForTokenHash({
			__LCHTokenLibraryD3__: 'alfa',
		}), LCHCompile.LCHBoomarkletTemplate.toString().replace("_protectFromSvelteCompiler('__LCHTokenLibraryD3__')", 'alfa'));
	});

});

describe('LCHBookmarkletBinaryFor', function testLCHBookmarkletBinaryFor() {

	it('throws error if not string', function() {
		assert.throws(function() {
			LCHCompile.LCHBookmarkletBinaryFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns bookmarklet binary', function() {
		assert.deepEqual(LCHCompile.LCHBookmarkletBinaryFor('function() { return; }'), 'javascript:(function()%20%7B%20return%3B%20%7D)();');
	});

});
