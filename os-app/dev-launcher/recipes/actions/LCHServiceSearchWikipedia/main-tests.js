const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHServiceSearchWikipediaCallback', function test_LCHServiceSearchWikipediaCallback() {

	it('returns string', function() {
		deepEqual(mod.LCHServiceSearchWikipediaCallback(), 'https://wikipedia.org/w/index.php?search=LCHSEARCHTOKEN');
	});

});

describe('LCHServiceSearchWikipediaRecipe', function test_LCHServiceSearchWikipediaRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHServiceSearchWikipediaRecipe(), {
			LCHRecipeName: 'Wikipedia',
			LCHRecipeCallback: mod.LCHServiceSearchWikipediaCallback,
			LCHRecipeOutputType: 'ServiceSearchURLTemplate',
			LCHRecipeSignature: 'LCHServiceSearchWikipedia',
		});
	});

});
