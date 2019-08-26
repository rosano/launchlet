import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHCompileValidCompileTokens', function testLCHCompileValidCompileTokens() {

	it('returns array', function() {
		deepEqual(mainModule.LCHCompileValidCompileTokens(), [
			'LCHCompileToken_AppBehaviour',
			'LCHCompileToken_AppStyle',
			'LCHCompileToken_DocumentObjects',
			'LCHCompileToken_AppLanguageCode',
			'LCHCompileToken_LCHLauncherMode',
			'LCHCompileToken_LCHComposeRecipeName',
			'LCHCompileToken_LCHComposeRecipeCallbackOutput',
		]);
	});

});

describe('LCHCompileBoomarkletTemplate', function testLCHCompileBoomarkletTemplate() {

	it('contains LCHCompileValidCompileTokens', function() {
		deepEqual(mainModule.LCHCompileValidCompileTokens().filter(function (e) {
			return mainModule.LCHCompileBoomarkletTemplate.toString().match(e);
		}), mainModule.LCHCompileValidCompileTokens());
	});

});

describe('LCHCompileBoomarkletStringFor', function testLCHCompileBoomarkletStringFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHCompileBoomarkletStringFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if without all tokens', function() {
		throws(function() {
			mainModule.LCHCompileBoomarkletStringFor(mainModule.LCHCompileValidCompileTokens().reduce(function (coll, item) {
				if (item !== 'LCHCompileToken_DocumentObjects') {
					coll[item] = '';
				}

				return coll;
			}, {}));
		}, /LCHErrorInputInvalid/);
	});

	it('replaces all tokens', function() {
		let item = mainModule.LCHCompileBoomarkletStringFor(mainModule.LCHCompileValidCompileTokens().reduce(function (coll, item) {
			coll[item] = item === 'LCHCompileToken_DocumentObjects' ? [] : '';

			return coll;
		}, {}));
		deepEqual(mainModule.LCHCompileValidCompileTokens().filter(function (e) {
			return !item.match(e);
		}), mainModule.LCHCompileValidCompileTokens());
	});

	it('throws no error if OLSK_TESTING', function() {
		doesNotThrow(function() {
			mainModule.LCHCompileBoomarkletStringFor({}, 'OLSK_TESTING');
		}, /LCHErrorInputInvalid/);
	});

	it('replaces wraps', function() {
		deepEqual(mainModule.LCHCompileBoomarkletStringFor({}, 'OLSK_TESTING'), mainModule.LCHCompileBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2'));
	});

	it('replaces LCHCompileToken_AppBehaviour', function() {
		deepEqual(mainModule.LCHCompileBoomarkletStringFor({
			LCHCompileToken_AppBehaviour: 'alfa',
		}, 'OLSK_TESTING'), mainModule.LCHCompileBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppBehaviour', 'alfa'));
	});

	it('replaces LCHCompileToken_DocumentObjects', function() {
		deepEqual(mainModule.LCHCompileBoomarkletStringFor({
			LCHCompileToken_DocumentObjects: [],
		}, 'OLSK_TESTING'), mainModule.LCHCompileBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_DocumentObjects', '[]'));
	});

	it('replaces LCHCompileToken_AppLanguageCode', function() {
		deepEqual(mainModule.LCHCompileBoomarkletStringFor({
			LCHCompileToken_AppLanguageCode: 'alfa',
		}, 'OLSK_TESTING'), mainModule.LCHCompileBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppLanguageCode', 'alfa'));
	});

	it('strips sourceMap js', function () {
		deepEqual(mainModule.LCHCompileBoomarkletStringFor({
			LCHCompileToken_AppBehaviour: `alfa//# sourceMappingURL=ui-behaviour.js.mapbravo`,
		}, 'OLSK_TESTING'), mainModule.LCHCompileBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppBehaviour', 'alfabravo'));
	});

	it('strips livereload', function () {
		deepEqual(mainModule.LCHCompileBoomarkletStringFor({
			LCHCompileToken_AppBehaviour: `alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':1234567890/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');bravo`,
		}, 'OLSK_TESTING'), mainModule.LCHCompileBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppBehaviour', 'alfabravo'));
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

describe('_LCHCompileRecipeJSON', function test_LCHCompileRecipeJSON() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule._LCHCompileRecipeJSON(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule._LCHCompileRecipeJSON({}), '{}');
	});

	it('stringifies inputData', function() {
		deepEqual(mainModule._LCHCompileRecipeJSON({
			alfa: 'bravo',
			charlie: true,
		}), '{"alfa":"bravo","charlie":true}');
	});

	it('prints LCHRecipeCallback directly', function() {
		deepEqual(mainModule._LCHCompileRecipeJSON({
			LCHRecipeCallback: 'function () { alfa }',
		}), '{"LCHRecipeCallback":function () { alfa }}');
	});

	it('prints LCHRecipeCallback with line breaks', function() {
		deepEqual(mainModule._LCHCompileRecipeJSON({
			LCHRecipeCallback: `
bravo
`,
		}), `{"LCHRecipeCallback":\nbravo\n}`);
	});

	it('prints LCHRecipeOutputTypeCanonicalExampleCallback directly', function() {
		deepEqual(mainModule._LCHCompileRecipeJSON({
			LCHRecipeOutputTypeCanonicalExampleCallback: 'function () { alfa }',
		}), '{"LCHRecipeOutputTypeCanonicalExampleCallback":function () { alfa }}');
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

	it('wraps LCHDocumentBody in closure', function() {
		deepEqual(mainModule._LCHComposeRecipeStub({
			LCHDocumentBody: 'alfa',
		}), {
			LCHRecipeCallback: 'function () { alfa }',
		});
	});

	it('wraps LCHDocumentOutputTypeCanonicalExampleBody in closure', function() {
		deepEqual(mainModule._LCHComposeRecipeStub({
			LCHDocumentOutputTypeCanonicalExampleBody: 'alfa',
		}), {
			LCHRecipeOutputTypeCanonicalExampleCallback: 'function () { alfa }',
		});
	});

});

describe('LCHCompileBookmarkletBinaryFor', function testLCHCompileBookmarkletBinaryFor() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHCompileBookmarkletBinaryFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHCompileBookmarkletBinaryFor('function() { return; }'), 'javascript:(function()%20%7B%20return%3B%20%7D)();');
	});

});
