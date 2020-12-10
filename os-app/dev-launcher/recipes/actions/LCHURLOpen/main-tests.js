const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHURLOpenCallback', function test_LCHURLOpenCallback() {

	it('returns undefined', function() {
		deepEqual(mod.LCHURLOpenCallback(), undefined);
	});

});

describe('LCHURLOpenRecipe', function test_LCHURLOpenRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHURLOpenRecipe(), {
			LCHRecipeSignature: 'LCHURLOpen',
			LCHRecipeInputTypes: 'URL',
			LCHRecipeCallback: mod.LCHURLOpenCallback,
		});
	});

});
