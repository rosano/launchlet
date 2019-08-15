import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHServiceSearchWikipediaCallback', function testLCHServiceSearchWikipediaCallback() {

	it('returns string', async function() {
		deepEqual(mainModule.LCHServiceSearchWikipediaCallback(), 'https://en.wikipedia.org/w/index.php?search=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2');
	});

});

describe('LCHServiceSearchWikipediaRecipe', function testLCHServiceSearchWikipediaRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHServiceSearchWikipediaRecipe(), {
			LCHRecipeName: 'Wikipedia',
			LCHRecipeCallback: mainModule.LCHServiceSearchWikipediaCallback,
			LCHRecipeOutputType: 'ServiceSearchURLTemplate',
			LCHRecipeSignature: 'LCHServiceSearchWikipedia',
		});
	});

});
