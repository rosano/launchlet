import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrineRestorePageColoursRecipe', function testLCHVitrineRestorePageColoursRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineRestorePageColoursRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineRestorePageColoursCallback,
			LCHRecipeSignature: 'LCHVitrineRestorePageColours',
			LCHRecipeIsHidden: mainModule.LCHVitrineRestorePageColoursIsHidden,
		});
	});

});
