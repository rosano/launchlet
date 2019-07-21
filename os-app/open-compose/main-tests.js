const assert = require('assert');

const LCHCompile = require('./main.js');

const kTesting = {
	kTestingValidInputHash: function() {
		return {
			LCHInputAppBehaviour: '',
			LCHInputAppStyle: '',
			LCHInputMemberObjects: [],
			LCHInputStyleContent: '',
			LCHInputLibraryD3Content: '',
		};
	},
	StubWrappedMemberObjectValid: function() {
		return {
			id: 'alfa',
			fnclosure: 'function () { return; }',
		};
	},
};

describe('LCHValidTokens', function testLCHValidTokens() {

	it('returns array', function() {
		assert.deepEqual(LCHCompile.LCHValidTokens(), [
			'LCHToken_AppBehaviour',
			'LCHToken_AppStyle',
			'LCHToken_MemberObjects',
			'LCHToken_AppLanguageCode',
			]);
	});

});

describe('LCHBoomarkletTemplateNew', function testLCHBoomarkletTemplateNew() {

	it('contains LCHValidTokens', function() {
		assert.deepEqual(LCHCompile.LCHValidTokens().filter(function (e) {
			return LCHCompile.LCHBoomarkletTemplateNew.toString().match(e);
		}), LCHCompile.LCHValidTokens());
	});

});

describe('LCHBookmarkletStringFor', function testLCHBookmarkletStringFor() {

	it('throws error if not object', function() {
		assert.throws(function() {
			LCHCompile.LCHBookmarkletStringFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if contains invalid token', function() {
		assert.throws(function() {
			LCHCompile.LCHBookmarkletStringFor({
				alfa: 'bravo',
			});
		}, /LCHErrorInputInvalid/);
	});

	it('replaces wraps', function() {
		assert.deepEqual(LCHCompile.LCHBookmarkletStringFor({}), LCHCompile.LCHBoomarkletTemplateNew.toString().replace(/_protectFromSvelteCompiler\(\u0060(.*)\u0060\);?/g, '$1'));
	});

	it('replaces tokens', function() {
		assert.deepEqual(LCHCompile.LCHBookmarkletStringFor({
			LCHToken_AppBehaviour: 'alfa',
			LCHToken_AppStyle: 'bravo',
			LCHToken_MemberObjects: [],
		}), LCHCompile.LCHBoomarkletTemplateNew.toString().replace(/_protectFromSvelteCompiler\(\u0060(.*)\u0060\);?/g, '$1').replace('LCHToken_AppBehaviour', 'alfa').replace('LCHToken_AppStyle', 'bravo').replace('LCHToken_MemberObjects', '[]'));
	});

	it('strips livereload', function () {
		assert.deepEqual(LCHCompile.LCHBookmarkletStringFor({
			LCHToken_AppBehaviour: `alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':5000/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');bravo`,
		}), LCHCompile.LCHBoomarkletTemplateNew.toString().replace(/_protectFromSvelteCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2').replace('LCHToken_AppBehaviour', 'alfabravo'));
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
		let item = kTesting.StubWrappedMemberObjectValid();
		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(`"${ item.fnclosure }"`, item.fnclosure));
	});

	it('returns stringified if multi line', function() {
		let item = Object.assign(kTesting.StubWrappedMemberObjectValid(), {
			fnclosure: `
return;
`,
		});

		assert.deepEqual(LCHCompile._LCHTokenMemberObjectsReplacementFor([item]), JSON.stringify([item]).replace('"fnclosure"', '"fn"').replace(/\\n/g, '\n').replace(`"${ item.fnclosure }"`, item.fnclosure));
	});

});
