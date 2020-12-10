const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHReadTextFileRecipe', function test_LCHReadTextFileRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHReadTextFileRecipe(), {
			LCHRecipeSignature: 'LCHReadTextFile',
			LCHRecipeCallback: mod.LCHReadTextFileCallback,
		});
	});

});
