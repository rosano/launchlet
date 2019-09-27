import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHRunCommandCallback', function testLCHRunCommandCallback() {

	it('returns inputData', function() {
		const item = function () {};
		deepEqual(mainModule.LCHRunCommandCallback(item), item);
	});

});

describe('LCHRunCommandRecipe', function testLCHRunCommandRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHRunCommandRecipe(), {
			LCHRecipeSignature: 'LCHRunCommand',
			LCHRecipeInputTypes: 'Command',
			LCHRecipeCallback: mainModule.LCHRunCommandCallback,
		});
	});

});
