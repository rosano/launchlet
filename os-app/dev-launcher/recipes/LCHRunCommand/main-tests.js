import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHRunCommandCallback', function testLCHRunCommandCallback() {

	it('returns LCHRecipeCallback result', async function() {
		deepEqual(mainModule.LCHRunCommandCallback({
			LCHRecipeCallback: function () {
				return 'alfa';
			},
		})(), 'alfa');
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
