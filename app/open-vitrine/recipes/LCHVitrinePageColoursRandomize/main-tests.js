import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrinePageColoursRandomizeRecipe', function testLCHVitrinePageColoursRandomizeRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageColoursRandomizeRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageColoursRandomizeCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
		});
	});

});
