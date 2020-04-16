const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHVitrinePageLinksHighlightAddRecipe', function test_LCHVitrinePageLinksHighlightAddRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageLinksHighlightAddRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageLinksHighlightAddCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageLinksHighlightAddIsHidden,
		});
	});

});
