const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHLargeTextCallback', function test_LCHLargeTextCallback() {

	it('returns undefined', function() {
		deepEqual(mod.LCHLargeTextCallback('alfa'), undefined);
	});

});

describe('LCHLargeTextRecipe', function test_LCHLargeTextRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHLargeTextRecipe(), {
			LCHRecipeSignature: 'LCHLargeText',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mod.LCHLargeTextCallback,
		});
	});

});
