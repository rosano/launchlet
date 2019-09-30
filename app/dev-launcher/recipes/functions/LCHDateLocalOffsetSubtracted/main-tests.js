import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHDateLocalOffsetSubtractedCallback', function testLCHDateLocalOffsetSubtractedCallback() {

	it('returns date', function() {
		deepEqual(mainModule.LCHDateLocalOffsetSubtractedCallback(new Date()) instanceof Date, true);
	});

	it('subtracts local offset', function() {
		let item = new Date();
		deepEqual(mainModule.LCHDateLocalOffsetSubtractedCallback(item), (new Date(Date.parse(item) - item.getTimezoneOffset() * 1000 * 60)));
	});

});

describe('LCHDateLocalOffsetSubtractedRecipe', function testLCHDateLocalOffsetSubtractedRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHDateLocalOffsetSubtractedRecipe(), {
			LCHRecipeSignature: 'LCHDateLocalOffsetSubtracted',
			LCHRecipeInputTypes: 'Date',
			LCHRecipeCallback: mainModule.LCHDateLocalOffsetSubtractedCallback,
		});
	});

});
