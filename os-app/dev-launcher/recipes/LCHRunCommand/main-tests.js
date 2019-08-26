import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHRunCommandCallback', function testLCHRunCommandCallback() {

	it('returns inputData', async function() {
		const item = function () {};
		deepEqual(mainModule.LCHRunCommandCallback(item), item);
	});

});

describe('LCHRunCommandRecipe', function testLCHRunCommandRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHRunCommandRecipe(), {
			LCHRecipeName: 'Run Command',
			LCHRecipeSignature: 'LCHRunCommand',
			LCHRecipeInputTypes: 'Command',
			LCHRecipeCallback: mainModule.LCHRunCommandCallback,
		});
	});

});
