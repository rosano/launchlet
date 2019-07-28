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
			'LCHCompileToken_FormulaObjects',
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
				LCHCompileToken_FormulaObjects: [],
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

	it('replaces LCHCompileToken_FormulaObjects', function() {
		deepEqual(mainModule.LCHComposeLogicBoomarkletStringFor({
			LCHCompileToken_FormulaObjects: [],
		}, 'OLSK_TESTING'), mainModule.LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHCompileToken_FormulaObjects', '[]'));
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

});

describe('_LCHComposeLogicFormulaObjectsReplacementFor', function test_LCHComposeLogicFormulaObjectsReplacementFor() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule._LCHComposeLogicFormulaObjectsReplacementFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns empty if no objects', function() {
		deepEqual(mainModule._LCHComposeLogicFormulaObjectsReplacementFor([]), '[]');
	});

	it('returns stringified if single line', function() {
		let item = kTesting.StubWrappedMemberObjectValid();
		deepEqual(mainModule._LCHComposeLogicFormulaObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(`"${ item.fnclosure }"`, item.fnclosure));
	});

	it('returns stringified if multi line', function() {
		let item = Object.assign(kTesting.StubWrappedMemberObjectValid(), {
			fnclosure: `
return;
`,
		});

		deepEqual(mainModule._LCHComposeLogicFormulaObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(/\\n/g, '\n').replace(`"${ item.fnclosure }"`, item.fnclosure));
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
