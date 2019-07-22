import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

const kTesting = {
	StubWrappedMemberObjectValid () {
		return {
			id: 'alfa',
			fnclosure: 'function () { return; }',
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
			'LCHCompileToken_NormalizeStyle',
			'LCHCompileToken_MemberObjects',
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
				LCHCompileToken_NormalizeStyle: '',
				LCHCompileToken_MemberObjects: [],
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

	it('replaces LCHCompileToken_AppStyle', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_AppStyle: '.Container.svelte-alfa{bravo',
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppStyle', '.Container.svelte-alfa{bravo'));
	});

	it('replaces LCHCompileToken_NormalizeStyle', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_NormalizeStyle: 'alfa',
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_NormalizeStyle', 'alfa'));
	});

	it('replaces LCHCompileToken_MemberObjects', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_MemberObjects: [],
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_MemberObjects', '[]'));
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
			LCHCompileToken_AppBehaviour: `alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':5000/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');bravo`,
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppBehaviour', 'alfabravo'));
	});

	context('LCHCompileToken_NormalizeStyle', function () {

		it('throws error if without identifier', function() {
			throws(function() {
				mainModule.LCHComposeLogicBoomarkletStringFor({
					LCHCompileToken_AppStyle: '.Containerr.svelte-alfa123{',
				}, 'OLSK_TESTING');
			}, /LCHErrorInputInvalid/);
		});

		it('prefixes with identifier', function() {
			deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
				LCHCompileToken_AppStyle: '.Container.svelte-alfa123{bravo',
				LCHCompileToken_NormalizeStyle: `\ntemplate {
  display: none;
}

[hidden] {
  display: none;
}`,
			}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_NormalizeStyle', `\n.Container.svelte-alfa123 template {
  display: none;
}

.Container.svelte-alfa123 [hidden] {
  display: none;
}`).replace('LCHCompileToken_AppStyle', '.Container.svelte-alfa123{bravo'));
		});

		it('escapes backtick', function() {
			deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
				LCHCompileToken_AppStyle: '',
				LCHCompileToken_NormalizeStyle: '/* `main` */',
			}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_AppStyle', '').replace('LCHCompileToken_NormalizeStyle', '/* \\`main\\` */'));
		});

		it.skip('strips comments', function() {
			deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
				LCHCompileToken_AppStyle: '',
				LCHCompileToken_NormalizeStyle: `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document: \`main\`
   ===================
 * alfa
 */\nbravo {charlie: delta;}`,
			}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_NormalizeStyle', '\nbravo {charlie: delta;}').replace('LCHCompileToken_AppStyle', ''));
		});

	});

});

describe('_LCHComposeLogicMemberObjectsReplacementFor', function test_LCHComposeLogicMemberObjectsReplacementFor() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule._LCHComposeLogicMemberObjectsReplacementFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns empty if no objects', function() {
		deepEqual(mainModule._LCHComposeLogicMemberObjectsReplacementFor([]), '[]');
	});

	it('returns stringified if single line', function() {
		let item = kTesting.StubWrappedMemberObjectValid();
		deepEqual(mainModule._LCHComposeLogicMemberObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(`"${ item.fnclosure }"`, item.fnclosure));
	});

	it('returns stringified if multi line', function() {
		let item = Object.assign(kTesting.StubWrappedMemberObjectValid(), {
			fnclosure: `
return;
`,
		});

		deepEqual(mainModule._LCHComposeLogicMemberObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(/\\n/g, '\n').replace(`"${ item.fnclosure }"`, item.fnclosure));
	});

});

describe('LCHComposeLogicBookmarkletBinaryFor', function testLCHComposeLogicBookmarkletBinaryFor() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposeLogicBookmarkletBinaryFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns bookmarklet binary', function() {
		deepEqual(mainModule.LCHComposeLogicBookmarkletBinaryFor('function() { return; }'), 'javascript:(function()%20%7B%20return%3B%20%7D)();');
	});

});
