const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHVitrinePageColoursRestoreRecipe', function test_LCHVitrinePageColoursRestoreRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageColoursRestoreRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageColoursRestoreCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRestore',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageColoursRestoreIsHidden,
		});
	});

});
