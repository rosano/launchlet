const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHRunCommandCallback', function test_LCHRunCommandCallback() {

	it('returns inputData', function() {
		const item = function () {};
		deepEqual(mainModule.LCHRunCommandCallback(item), item);
	});

});

describe('LCHRunCommandRecipe', function test_LCHRunCommandRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHRunCommandRecipe(), {
			LCHRecipeSignature: 'LCHRunCommand',
			LCHRecipeInputTypes: 'Command',
			LCHRecipeCallback: mainModule.LCHRunCommandCallback,
		});
	});

});
