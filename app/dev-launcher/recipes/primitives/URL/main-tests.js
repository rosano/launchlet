const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHPrimitiveURLCallback', function testLCHPrimitiveURLCallback() {

	it.skip('throws error if not string', function() {
		throws(function() {
			mainModule.LCHPrimitiveURLCallback(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if not string', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback(null), false);
	});

	it('returns false if no scheme', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('://example'), false);
	});

	it('returns false if no colon', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http//example'), false);
	});

	it('returns false if no slashes', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http:/example'), false);
	});

	it('returns false if no host', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http://'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http://example'), true);
	});

	it('accepts https', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('https://example'), true);
	});

	it('accepts domain', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http://example.com'), true);
	});

	it('accepts port', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http://example.com:80'), true);
	});

	it('accepts path', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http://example.com/alfa'), true);
	});

	it('accepts anchor', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http://example.com#alfa'), true);
	});

	it('accepts query', function() {
		deepEqual(mainModule.LCHPrimitiveURLCallback('http://example.com?alfa'), true);
	});

});

describe('LCHPrimitiveStringCanonicalExampleCallback', function testLCHPrimitiveStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHPrimitiveStringCanonicalExampleCallback(), 'http://example.com');
	});

});

describe('LCHPrimitiveURLRecipe', function testLCHPrimitiveURLRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveURLRecipe(), {
			LCHRecipeSignature: 'URL',
			LCHRecipeCallback: mainModule.LCHPrimitiveURLCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHPrimitiveStringCanonicalExampleCallback,
		});
	});

});
