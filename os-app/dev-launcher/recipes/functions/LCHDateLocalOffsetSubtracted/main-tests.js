const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHDateLocalOffsetSubtractedCallback', function test_LCHDateLocalOffsetSubtractedCallback() {

	it('returns date', function() {
		deepEqual(mod.LCHDateLocalOffsetSubtractedCallback(new Date()) instanceof Date, true);
	});

	it('subtracts local offset', function() {
		let item = new Date();
		deepEqual(mod.LCHDateLocalOffsetSubtractedCallback(item), (new Date(Date.parse(item) - item.getTimezoneOffset() * 1000 * 60)));
	});

});

describe('LCHDateLocalOffsetSubtractedRecipe', function test_LCHDateLocalOffsetSubtractedRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHDateLocalOffsetSubtractedRecipe(), {
			LCHRecipeSignature: 'LCHDateLocalOffsetSubtracted',
			LCHRecipeInputTypes: 'Date',
			LCHRecipeCallback: mod.LCHDateLocalOffsetSubtractedCallback,
		});
	});

});
