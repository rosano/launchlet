import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHComposeBuildValidBuildTokens', function testLCHComposeBuildValidBuildTokens() {

	it('returns array', function() {
		deepEqual(mainModule.LCHComposeBuildValidBuildTokens(), [
			'LCHComposeBuildToken_AppBehaviour',
			'LCHComposeBuildToken_AppStyle',
			'LCHComposeBuildToken_DocumentObjects',
			'LCHComposeBuildToken_AppLanguageCode',
			'LCHComposeBuildToken_LCHLauncherMode',
			'LCHComposeBuildToken_LCHComposeRecipeName',
			'LCHComposeBuildToken_LCHComposeRecipeCallbackOutput',
		]);
	});

});

describe('LCHComposeBuildBoomarkletTemplate', function testLCHComposeBuildBoomarkletTemplate() {

	it('contains LCHComposeBuildValidBuildTokens', function() {
		deepEqual(mainModule.LCHComposeBuildValidBuildTokens().filter(function (e) {
			return mainModule.LCHComposeBuildBoomarkletTemplate().match(e);
		}), mainModule.LCHComposeBuildValidBuildTokens());
	});

	it('wraps _LCHComposeBuildBoomarkletTemplate in iife', function() {
		deepEqual(mainModule.LCHComposeBuildBoomarkletTemplate(), `(${ mainModule._LCHComposeBuildBoomarkletTemplate.toString() })()`);
	});

});

describe('LCHComposeBuildBoomarkletStringFor', function testLCHComposeBuildBoomarkletStringFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHComposeBuildBoomarkletStringFor(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if without all tokens', function() {
		throws(function() {
			mainModule.LCHComposeBuildBoomarkletStringFor(mainModule.LCHComposeBuildValidBuildTokens().reduce(function (coll, item) {
				if (item !== 'LCHComposeBuildToken_DocumentObjects') {
					coll[item] = '';
				}

				return coll;
			}, {}));
		}, /LCHErrorInputNotValid/);
	});

	it('replaces all tokens', function() {
		let item = mainModule.LCHComposeBuildBoomarkletStringFor(mainModule.LCHComposeBuildValidBuildTokens().reduce(function (coll, item) {
			coll[item] = item === 'LCHComposeBuildToken_DocumentObjects' ? [] : '';

			return coll;
		}, {}));
		deepEqual(mainModule.LCHComposeBuildValidBuildTokens().filter(function (e) {
			return !item.match(e);
		}), mainModule.LCHComposeBuildValidBuildTokens());
	});

	it('throws no error if OLSK_TESTING', function() {
		doesNotThrow(function() {
			mainModule.LCHComposeBuildBoomarkletStringFor({}, 'OLSK_TESTING');
		}, /LCHErrorInputNotValid/);
	});

	it('replaces wraps', function() {
		deepEqual(mainModule.LCHComposeBuildBoomarkletStringFor({}, 'OLSK_TESTING'), mainModule.LCHComposeBuildBoomarkletTemplate().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2'));
	});

	it('replaces LCHComposeBuildToken_AppBehaviour', function() {
		deepEqual(mainModule.LCHComposeBuildBoomarkletStringFor({
			LCHComposeBuildToken_AppBehaviour: 'alfa',
		}, 'OLSK_TESTING'), mainModule.LCHComposeBuildBoomarkletTemplate().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHComposeBuildToken_AppBehaviour', 'alfa'));
	});

	it('replaces LCHComposeBuildToken_DocumentObjects', function() {
		deepEqual(mainModule.LCHComposeBuildBoomarkletStringFor({
			LCHComposeBuildToken_DocumentObjects: [],
		}, 'OLSK_TESTING'), mainModule.LCHComposeBuildBoomarkletTemplate().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHComposeBuildToken_DocumentObjects', '[]'));
	});

	it('replaces LCHComposeBuildToken_AppLanguageCode', function() {
		deepEqual(mainModule.LCHComposeBuildBoomarkletStringFor({
			LCHComposeBuildToken_AppLanguageCode: 'alfa',
		}, 'OLSK_TESTING'), mainModule.LCHComposeBuildBoomarkletTemplate().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHComposeBuildToken_AppLanguageCode', 'alfa'));
	});

});

describe('LCHComposeBuildBookmarkletBinaryFor', function testLCHComposeBuildBookmarkletBinaryFor() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposeBuildBookmarkletBinaryFor(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHComposeBuildBookmarkletBinaryFor('(function() { return; })()'), 'javascript:(function()%20%7B%20return%3B%20%7D)()');
	});

});
