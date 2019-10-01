import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrinePageColoursRestoreRecipe', function testLCHVitrinePageColoursRestoreRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageColoursRestoreRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageColoursRestoreCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRestore',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageColoursRestoreIsHidden,
		});
	});

});
