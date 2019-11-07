const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHLargeTextCallback', function testLCHLargeTextCallback() {

	it('returns undefined', function() {
		deepEqual(mainModule.LCHLargeTextCallback('alfa'), undefined);
	});

});

describe('LCHLargeTextRecipe', function testLCHLargeTextRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHLargeTextRecipe(), {
			LCHRecipeSignature: 'LCHLargeText',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mainModule.LCHLargeTextCallback,
		});
	});

});
