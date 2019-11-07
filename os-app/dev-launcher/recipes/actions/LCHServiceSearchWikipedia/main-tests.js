const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHServiceSearchWikipediaCallback', function testLCHServiceSearchWikipediaCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHServiceSearchWikipediaCallback(), 'https://wikipedia.org/w/index.php?search=LCHSEARCHTOKEN');
	});

});

describe('LCHServiceSearchWikipediaRecipe', function testLCHServiceSearchWikipediaRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHServiceSearchWikipediaRecipe(), {
			LCHRecipeName: 'Wikipedia',
			LCHRecipeCallback: mainModule.LCHServiceSearchWikipediaCallback,
			LCHRecipeOutputType: 'ServiceSearchURLTemplate',
			LCHRecipeSignature: 'LCHServiceSearchWikipedia',
		});
	});

});
