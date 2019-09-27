import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHServiceSearchWikipediaCallback', function testLCHServiceSearchWikipediaCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHServiceSearchWikipediaCallback(), 'https://en.wikipedia.org/w/index.php?search=LCHSEARCHTOKEN');
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
