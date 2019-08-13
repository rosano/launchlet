import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

const kTesting = {
	StubClosureObjectValid: function() {
		return {
			LCHClosureString: 'alfa',
		};
	},
};

describe('LCHComposeLogicSort', function testLCHComposeLogicSort() {

	it('sorts by LCHMemberModificationDate descending', function() {
		let item1 = {
			LCHMemberModificationDate: new Date(0),
		};
		let item2 = {
			LCHMemberModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

	it('sorts by LCHMemberCreationDate descending if no LCHMemberModificationDate', function() {
		let item1 = {
			LCHMemberCreationDate: new Date(0),
		};
		let item2 = {
			LCHMemberCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

});

describe('LCHComposeLogicValidCompileTokens', function testLCHComposeLogicValidCompileTokens() {

	it('returns array', function() {
		deepEqual(mainModule.LCHComposeLogicValidCompileTokens(), [
			'LCHCompileToken_AppBehaviour',
			'LCHCompileToken_AppStyle',
			'LCHCompileToken_ClosureObjects',
			'LCHCompileToken_AppLanguageCode',
			]);
	});

});

describe('LCHComposeLogicBoomarkletTemplate', function testLCHComposeLogicBoomarkletTemplate() {

	it('contains LCHComposeLogicValidCompileTokens', function() {
		deepEqual(mainModule.LCHComposeLogicValidCompileTokens().filter(function (e) {
			return mainModule.LCHComposeLogicBoomarkletTemplate.toString().match(e);
		}), mainModule.LCHComposeLogicValidCompileTokens());
	});

});

describe('LCHComposeLogicBoomarkletStringFor', function testLCHComposeLogicBoomarkletStringFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHComposeLogicBoomarkletStringFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if without all tokens', function() {
		throws(function() {
			mainModule.LCHComposeLogicBoomarkletStringFor({
				LCHCompileToken_AppStyle: '',
				LCHCompileToken_ClosureObjects: [],
				LCHCompileToken_AppLanguageCode: '',
			});
		}, /LCHErrorInputInvalid/);
	});

	it('throws no error if OLSK_TESTING', function() {
		doesNotThrow(function() {
			mainModule.LCHComposeLogicBoomarkletStringFor({}, 'OLSK_TESTING');
		}, /LCHErrorInputInvalid/);
	});

	it('replaces wraps', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2'));
	});

	it('replaces LCHCompileToken_AppBehaviour', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_AppBehaviour: 'alfa',
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppBehaviour', 'alfa'));
	});

	it('replaces LCHCompileToken_ClosureObjects', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_ClosureObjects: [],
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_ClosureObjects', '[]'));
	});

	it('replaces LCHCompileToken_AppLanguageCode', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_AppLanguageCode: 'alfa',
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppLanguageCode', 'alfa'));
	});

	it('strips sourceMap js', function () {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_AppBehaviour: `alfa//# sourceMappingURL=ui-behaviour.js.mapbravo`,
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppBehaviour', 'alfabravo'));
	});

	it('strips livereload', function () {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_AppBehaviour: `alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':1234567890/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');bravo`,
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppBehaviour', 'alfabravo'));
	});

});

describe('_LCHClosureObjectFor', function test_LCHClosureObjectFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule._LCHClosureObjectFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHMemberBody not string', function() {
		throws(function() {
			mainModule._LCHClosureObjectFor({});
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHMemberBody not filled', function() {
		throws(function() {
			mainModule._LCHClosureObjectFor({
				LCHMemberBody: '',
			});
		}, /LCHErrorInputInvalid/);
	});

	it('returns object', function() {
		deepEqual(mainModule._LCHClosureObjectFor({
			LCHMemberBody: 'alfa',
		}), {
			LCHClosureString: 'function () { alfa }',
		});
	});

	context('LCHMemberArgs', function() {

		it('populates LCHClosureString', function() {
			deepEqual(mainModule._LCHClosureObjectFor({
				LCHMemberBody: 'alfa',
				LCHMemberArgs: 'bravo',
			}), {
				LCHClosureString: 'function (bravo) { alfa }',
			});
		});

	});

	context('LCHClosureSignature', function() {

		it('populates LCHClosureSignature', function() {
			deepEqual(mainModule._LCHClosureObjectFor({
				LCHMemberBody: 'alfa',
				LCHMemberSignature: 'bravo',
			}), {
				LCHClosureString: 'function () { alfa }',
				LCHClosureSignature: 'bravo',
			});
		});

	});

	context('LCHClosureURLFilter', function() {

		it('populates LCHClosureURLFilter', function() {
			deepEqual(mainModule._LCHClosureObjectFor({
				LCHMemberBody: 'alfa',
				LCHMemberURLFilter: 'bravo',
			}), {
				LCHClosureString: 'function () { alfa }',
				LCHClosureURLFilter: 'bravo',
			});
		});

	});

	context('LCHClosureIsAutomatic', function() {

		it('populates LCHClosureIsAutomatic', function() {
			deepEqual(mainModule._LCHClosureObjectFor({
				LCHMemberBody: 'alfa',
				LCHMemberIsAutomatic: 'bravo',
			}), {
				LCHClosureString: 'function () { alfa }',
				LCHClosureIsAutomatic: 'bravo',
			});
		});

	});

	context('LCHClosureName', function() {

		it('populates LCHClosureName', function() {
			deepEqual(mainModule._LCHClosureObjectFor({
				LCHMemberBody: 'alfa',
				LCHMemberName: 'bravo',
			}), {
				LCHClosureString: 'function () { alfa }',
				LCHClosureName: 'bravo',
			});
		});

	});

});

describe('LCHClosuresModelErrorsFor', function testLCHClosuresModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHClosuresModelErrorsFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object if LCHClosureCallback not string', function() {
		deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
			LCHClosureString: null,
		})), {
			LCHClosureString: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHClosuresModelErrorsFor(kTesting.StubClosureObjectValid()), null);
	});

	context('LCHClosureName', function() {

		it('returns object if LCHClosureName not string', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureName: null,
			})), {
				LCHClosureName: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns object if LCHClosureName not filled', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureName: '',
			})), {
				LCHClosureName: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if LCHClosureName contains untrimmed whitespace', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureName: ' alfa',
			})), {
				LCHClosureName: [
					'LCHErrorNotTrimmed',
				],
			});
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureName: 'alfa ',
			})), {
				LCHClosureName: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureName: 'alfa',
			})), null);
		});

	});

	context('LCHClosureSignature', function() {

		it('returns object if LCHClosureSignature not string', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureSignature: null,
			})), {
				LCHClosureSignature: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureSignature: 'alfa',
			})), null);
		});

	});

	context('LCHClosureURLFilter', function() {

		it('returns object if LCHClosureURLFilter not string', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureURLFilter: null,
			})), {
				LCHClosureURLFilter: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHClosuresModelErrorsFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureURLFilter: 'alfa',
			})), null);
		});

	});

});

describe('_LCHComposeLogicRecipeStubFor', function test_LCHComposeLogicRecipeStubFor() {

	it('throws error if not valid LCHClosureObject', function() {
		throws(function() {
			mainModule._LCHComposeLogicRecipeStubFor({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule._LCHComposeLogicRecipeStubFor(kTesting.StubClosureObjectValid()), `{"LCHRecipeCallback":alfa}`);
	});

	it('prints line breaks', function() {
		deepEqual(mainModule._LCHComposeLogicRecipeStubFor(Object.assign(kTesting.StubClosureObjectValid(), {
			LCHClosureString: `
bravo
`,
		})), `{"LCHRecipeCallback":\nbravo\n}`);
	});

	context('LCHClosureName', function() {

		it('prints LCHRecipeTitle', function() {
			deepEqual(mainModule._LCHComposeLogicRecipeStubFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureName: 'bravo',
			})), `{"LCHRecipeCallback":alfa,"LCHRecipeTitle":"bravo"}`);
		});

	});

	context('LCHClosureSignature', function() {

		it('prints LCHRecipeSignature', function() {
			deepEqual(mainModule._LCHComposeLogicRecipeStubFor(Object.assign(kTesting.StubClosureObjectValid(), {
				LCHClosureSignature: 'bravo',
			})), `{"LCHRecipeCallback":alfa,"LCHRecipeSignature":"bravo"}`);
		});

	});

});

describe('_LCHComposeLogicFormulaObjectsReplacementFor', function test_LCHComposeLogicFormulaObjectsReplacementFor() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule._LCHComposeLogicFormulaObjectsReplacementFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule._LCHComposeLogicFormulaObjectsReplacementFor([]), '[]');
	});

	it('includes recipe stubs', function() {
		deepEqual(mainModule._LCHComposeLogicFormulaObjectsReplacementFor([kTesting.StubClosureObjectValid()]), '[{"LCHRecipeCallback":alfa}]');
	});

});

describe('LCHComposeLogicBookmarkletBinaryFor', function testLCHComposeLogicBookmarkletBinaryFor() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposeLogicBookmarkletBinaryFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHComposeLogicBookmarkletBinaryFor('function() { return; }'), 'javascript:(function()%20%7B%20return%3B%20%7D)();');
	});

});
