const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHPrimitiveBoolCallback', function test_LCHPrimitiveBoolCallback() {

	it('returns false if not present', function() {
		deepEqual(mod.LCHPrimitiveBoolCallback(), false);
	});

	it('returns false if undefined', function() {
		deepEqual(mod.LCHPrimitiveBoolCallback(undefined), false);
	});

	it('returns false if null', function() {
		deepEqual(mod.LCHPrimitiveBoolCallback(null), false);
	});

	it('returns false if empty string', function() {
		deepEqual(mod.LCHPrimitiveBoolCallback(''), false);
	});

	it('returns true if true', function() {
		deepEqual(mod.LCHPrimitiveBoolCallback(true), true);
	});

	it('returns true if filled string', function() {
		deepEqual(mod.LCHPrimitiveBoolCallback('alfa'), true);
	});

});

describe('LCHPrimitiveBoolRecipe', function test_LCHPrimitiveBoolRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHPrimitiveBoolRecipe(), {
			LCHRecipeSignature: 'Bool',
			LCHRecipeCallback: mod.LCHPrimitiveBoolCallback,
		});
	});

});
