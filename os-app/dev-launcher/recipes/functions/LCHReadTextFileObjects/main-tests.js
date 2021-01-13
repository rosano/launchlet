const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHReadTextFileObjectsRecipe', function test_LCHReadTextFileObjectsRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHReadTextFileObjectsRecipe(), {
			LCHRecipeSignature: 'LCHReadTextFileObjects',
			LCHRecipeCallback: mod.LCHReadTextFileObjectsCallback,
		});
	});

});
