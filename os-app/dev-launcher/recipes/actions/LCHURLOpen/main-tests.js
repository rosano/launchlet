import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHURLOpenCallback', function testLCHURLOpenCallback() {

	it('returns undefined', function() {
		deepEqual(typeof mainModule.LCHURLOpenCallback(), 'undefined');
	});

});

describe('LCHURLOpenRecipe', function testLCHURLOpenRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHURLOpenRecipe(), {
			LCHRecipeName: 'Open URL',
			LCHRecipeSignature: 'LCHURLOpen',
			LCHRecipeInputTypes: 'URL',
			LCHRecipeCallback: mainModule.LCHURLOpenCallback,
		});
	});

});
