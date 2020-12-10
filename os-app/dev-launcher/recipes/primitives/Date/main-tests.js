const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHPrimitiveDateCallback', function test_LCHPrimitiveDateCallback() {

	it('returns false if not date', function() {
		deepEqual(mod.LCHPrimitiveDateCallback(null), false);
	});

	it('returns false if not valid', function() {
		deepEqual(mod.LCHPrimitiveDateCallback(new Date('alfa')), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHPrimitiveDateCallback(new Date()), true);
	});

});

describe('LCHPrimitiveDateCanonicalExampleCallback', function test_LCHPrimitiveDateCanonicalExampleCallback() {

	it('returns Date', function() {
		deepEqual(mod.LCHPrimitiveDateCanonicalExampleCallback(), new Date(0));
	});

});

describe('LCHPrimitiveDateRecipe', function test_LCHPrimitiveDateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHPrimitiveDateRecipe(), {
			LCHRecipeSignature: 'Date',
			LCHRecipeCallback: mod.LCHPrimitiveDateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHPrimitiveDateCanonicalExampleCallback,
		});
	});

});
