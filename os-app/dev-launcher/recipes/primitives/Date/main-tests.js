const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHPrimitiveDateCallback', function test_LCHPrimitiveDateCallback() {

	it('returns false if not date', function() {
		deepEqual(mainModule.LCHPrimitiveDateCallback(null), false);
	});

	it('returns false if not valid', function() {
		deepEqual(mainModule.LCHPrimitiveDateCallback(new Date('alfa')), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveDateCallback(new Date()), true);
	});

});

describe('LCHPrimitiveDateCanonicalExampleCallback', function test_LCHPrimitiveDateCanonicalExampleCallback() {

	it('returns Date', function() {
		deepEqual(mainModule.LCHPrimitiveDateCanonicalExampleCallback(), new Date(0));
	});

});

describe('LCHPrimitiveDateRecipe', function test_LCHPrimitiveDateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveDateRecipe(), {
			LCHRecipeSignature: 'Date',
			LCHRecipeCallback: mainModule.LCHPrimitiveDateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHPrimitiveDateCanonicalExampleCallback,
		});
	});

});
