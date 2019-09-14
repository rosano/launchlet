import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrineMinimalistDateStringRecipe', function testLCHVitrineMinimalistDateStringRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineMinimalistDateStringCallback,
			LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
		});
	});

});
