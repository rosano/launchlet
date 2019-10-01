import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrinePageLinksHighlightRemoveRecipe', function testLCHVitrinePageLinksHighlightRemoveRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageLinksHighlightRemoveRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageLinksHighlightRemoveCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightRemove',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageLinksHighlightRemoveIsHidden,
		});
	});

});
