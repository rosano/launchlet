const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHRunCommandCallback', function test_LCHRunCommandCallback() {

	it('returns inputData', function() {
		const item = function () {};
		deepEqual(mod.LCHRunCommandCallback(item), item);
	});

});

describe('LCHRunCommandRecipe', function test_LCHRunCommandRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHRunCommandRecipe(), {
			LCHRecipeSignature: 'LCHRunCommand',
			LCHRecipeInputTypes: 'Command',
			LCHRecipeCallback: mod.LCHRunCommandCallback,
		});
	});

});
