const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHVitrinePageLinksHighlightAddRecipe', function testLCHVitrinePageLinksHighlightAddRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageLinksHighlightAddRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageLinksHighlightAddCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageLinksHighlightAddIsHidden,
		});
	});

});
