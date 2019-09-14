import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrineRandomizePageColoursRecipe', function testLCHVitrineRandomizePageColoursRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineRandomizePageColoursRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineRandomizePageColoursCallback,
			LCHRecipeSignature: 'LCHVitrineRandomizePageColours',
		});
	});

});
