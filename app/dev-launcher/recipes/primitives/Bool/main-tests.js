const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHPrimitiveBoolCallback', function testLCHPrimitiveBoolCallback() {

	it('returns false if not present', function() {
		deepEqual(mainModule.LCHPrimitiveBoolCallback(), false);
	});

	it('returns false if undefined', function() {
		deepEqual(mainModule.LCHPrimitiveBoolCallback(undefined), false);
	});

	it('returns false if null', function() {
		deepEqual(mainModule.LCHPrimitiveBoolCallback(null), false);
	});

	it('returns false if empty string', function() {
		deepEqual(mainModule.LCHPrimitiveBoolCallback(''), false);
	});

	it('returns true if true', function() {
		deepEqual(mainModule.LCHPrimitiveBoolCallback(true), true);
	});

	it('returns true if filled string', function() {
		deepEqual(mainModule.LCHPrimitiveBoolCallback('alfa'), true);
	});

});

describe('LCHPrimitiveBoolRecipe', function testLCHPrimitiveBoolRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveBoolRecipe(), {
			LCHRecipeSignature: 'Bool',
			LCHRecipeCallback: mainModule.LCHPrimitiveBoolCallback,
		});
	});

});
