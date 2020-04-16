const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHServiceSearchWikipediaCallback', function test_LCHServiceSearchWikipediaCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHServiceSearchWikipediaCallback(), 'https://wikipedia.org/w/index.php?search=LCHSEARCHTOKEN');
	});

});

describe('LCHServiceSearchWikipediaRecipe', function test_LCHServiceSearchWikipediaRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHServiceSearchWikipediaRecipe(), {
			LCHRecipeName: 'Wikipedia',
			LCHRecipeCallback: mainModule.LCHServiceSearchWikipediaCallback,
			LCHRecipeOutputType: 'ServiceSearchURLTemplate',
			LCHRecipeSignature: 'LCHServiceSearchWikipedia',
		});
	});

});
