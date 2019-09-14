import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrineHighlightPageLinksRecipe', function testLCHVitrineHighlightPageLinksRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineHighlightPageLinksRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineHighlightPageLinksCallback,
			LCHRecipeSignature: 'LCHVitrineHighlightPageLinks',
		});
	});

});
