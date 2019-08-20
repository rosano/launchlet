import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHComposeFilterFunction', function testLCHComposeFilterFunction() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposeFilterFunction(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHComposeFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if LCHDocumentSignature match', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
				LCHDocumentSignature: 'alfa',
			}), false);
		});

		it('returns false if LCHDocumentCallback match', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
				LCHDocumentCallback () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('bravo')({
				LCHDocumentName: 'alfa',
			}), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
				LCHDocumentName: 'alfa',
			}), true);
		});

		it('matches partial', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alf')({
				LCHDocumentName: 'alfa',
			}), true);
		});

		it('matches case insensitive', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('ALF')({
				LCHDocumentName: 'alfa',
			}), true);
		});
		
	});

});

describe('LCHComposeLogicSort', function testLCHComposeLogicSort() {

	it('sorts by LCHDocumentModificationDate descending', function() {
		let item1 = {
			LCHDocumentModificationDate: new Date(0),
		};
		let item2 = {
			LCHDocumentModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

	it('sorts by LCHDocumentCreationDate descending if no LCHDocumentModificationDate', function() {
		let item1 = {
			LCHDocumentCreationDate: new Date(0),
		};
		let item2 = {
			LCHDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

});

describe('LCHComposeLogicValidCompileTokens', function testLCHComposeLogicValidCompileTokens() {

	it('returns array', function() {
		deepEqual(mainModule.LCHComposeLogicValidCompileTokens(), [
			'LCHCompileToken_AppBehaviour',
			'LCHCompileToken_AppStyle',
			'LCHCompileToken_DocumenntObjects',
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
				LCHCompileToken_DocumenntObjects: [],
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

	it('replaces LCHCompileToken_DocumenntObjects', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_DocumenntObjects: [],
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_DocumenntObjects', '[]'));
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

describe('_LCHClosureString', function test_LCHClosureString() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule._LCHClosureString(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if LCHDocumentBody not string', function() {
		throws(function() {
			mainModule._LCHClosureString({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule._LCHClosureString({
			LCHDocumentBody: 'alfa',
		}), 'function () { alfa }');
	});

	context('LCHDocumentArgs', function() {

		it('populates LCHClosureString', function() {
			deepEqual(mainModule._LCHClosureString({
				LCHDocumentBody: 'alfa',
				LCHDocumentArgs: 'bravo',
			}), 'function (bravo) { alfa }');
		});

	});

});

describe('_LCHComposeLogicRecipeJSON', function test_LCHComposeLogicRecipeJSON() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule._LCHComposeLogicRecipeJSON(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule._LCHComposeLogicRecipeJSON({}), '{}');
	});

	it('stringifies inputData', function() {
		deepEqual(mainModule._LCHComposeLogicRecipeJSON({
			alfa: 'bravo',
			charlie: true,
		}), '{"alfa":"bravo","charlie":true}');
	});

	it('prints LCHRecipeCallback directly', function() {
		deepEqual(mainModule._LCHComposeLogicRecipeJSON({
			LCHRecipeCallback: 'function () { alfa }',
		}), '{"LCHRecipeCallback":function () { alfa }}');
	});

	it('prints LCHRecipeCallback with line breaks', function() {
		deepEqual(mainModule._LCHComposeLogicRecipeJSON({
			LCHRecipeCallback: `
bravo
`,
		}), `{"LCHRecipeCallback":\nbravo\n}`);
	});

});

describe('_LCHComposeRecipeStub', function test_LCHComposeRecipeStub() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule._LCHComposeRecipeStub(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object', function() {
		deepEqual(mainModule._LCHComposeRecipeStub({}), {});
	});

	it('converts formula fields', function() {
		deepEqual(mainModule._LCHComposeRecipeStub({
			LCHDocumentName: '',
		}), {
			LCHRecipeName: '',
		});
	});

	it('ignores others', function() {
		deepEqual(mainModule._LCHComposeRecipeStub({
			alfa: '',
		}), {});
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
