import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHLargeTypeCallback', function testLCHLargeTypeCallback() {

	it('returns undefined', async function() {
		deepEqual(typeof mainModule.LCHLargeTypeCallback('alfa'), 'undefined');
	});

});

describe('LCHLargeTypeRecipe', function testLCHLargeTypeRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHLargeTypeRecipe(), {
			LCHRecipeName: 'Large Type',
			LCHRecipeSignature: 'LCHLargeType',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mainModule.LCHLargeTypeCallback,
		});
	});

});
