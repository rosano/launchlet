const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHReadTextFileRecipe', function test_LCHReadTextFileRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHReadTextFileRecipe(), {
			LCHRecipeSignature: 'LCHReadTextFile',
			LCHRecipeCallback: mainModule.LCHReadTextFileCallback,
		});
	});

});
