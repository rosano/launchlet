const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHPrimitiveURLCallback', function test_LCHPrimitiveURLCallback() {

	it.skip('throws error if not string', function() {
		throws(function() {
			mod.LCHPrimitiveURLCallback(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if not string', function() {
		deepEqual(mod.LCHPrimitiveURLCallback(null), false);
	});

	it('returns false if no scheme', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('://example'), false);
	});

	it('returns false if no colon', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http//example'), false);
	});

	it('returns false if no slashes', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http:/example'), false);
	});

	it('returns false if no host', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http://'), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http://example'), true);
	});

	it('accepts https', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('https://example'), true);
	});

	it('accepts domain', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http://example.com'), true);
	});

	it('accepts port', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http://example.com:80'), true);
	});

	it('accepts path', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http://example.com/alfa'), true);
	});

	it('accepts anchor', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http://example.com#alfa'), true);
	});

	it('accepts query', function() {
		deepEqual(mod.LCHPrimitiveURLCallback('http://example.com?alfa'), true);
	});

});

describe('LCHPrimitiveStringCanonicalExampleCallback', function test_LCHPrimitiveStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mod.LCHPrimitiveStringCanonicalExampleCallback(), 'http://example.com');
	});

});

describe('LCHPrimitiveURLRecipe', function test_LCHPrimitiveURLRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHPrimitiveURLRecipe(), {
			LCHRecipeSignature: 'URL',
			LCHRecipeCallback: mod.LCHPrimitiveURLCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHPrimitiveStringCanonicalExampleCallback,
		});
	});

});
