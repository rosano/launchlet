import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrinePageLinksHighlightAddRecipe', function testLCHVitrinePageLinksHighlightAddRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageLinksHighlightAddRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageLinksHighlightAddCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageLinksHighlightAddIsHidden,
		});
	});

});
