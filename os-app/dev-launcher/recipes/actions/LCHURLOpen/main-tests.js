const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHURLOpenCallback', function test_LCHURLOpenCallback() {

	it('returns undefined', function() {
		deepEqual(mainModule.LCHURLOpenCallback(), undefined);
	});

});

describe('LCHURLOpenRecipe', function test_LCHURLOpenRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHURLOpenRecipe(), {
			LCHRecipeSignature: 'LCHURLOpen',
			LCHRecipeInputTypes: 'URL',
			LCHRecipeCallback: mainModule.LCHURLOpenCallback,
		});
	});

});
