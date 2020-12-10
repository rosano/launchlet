const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHPrimitiveStringCallback', function test_LCHPrimitiveStringCallback() {

	it('returns false if not string', function() {
		deepEqual(mod.LCHPrimitiveStringCallback(null), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHPrimitiveStringCallback(''), true);
	});

});

describe('LCHPrimitiveStringCanonicalExampleCallback', function test_LCHPrimitiveStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mod.LCHPrimitiveStringCanonicalExampleCallback(), '');
	});

});

describe('LCHPrimitiveStringRecipe', function test_LCHPrimitiveStringRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHPrimitiveStringRecipe(), {
			LCHRecipeSignature: 'String',
			LCHRecipeCallback: mod.LCHPrimitiveStringCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHPrimitiveStringCanonicalExampleCallback,
		});
	});

});
