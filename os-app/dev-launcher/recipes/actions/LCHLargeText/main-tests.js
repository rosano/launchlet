import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHLargeTextCallback', function testLCHLargeTextCallback() {

	it('returns undefined', async function() {
		deepEqual(typeof mainModule.LCHLargeTextCallback('alfa'), 'undefined');
	});

});

describe('LCHLargeTextRecipe', function testLCHLargeTextRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHLargeTextRecipe(), {
			LCHRecipeSignature: 'LCHLargeText',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: mainModule.LCHLargeTextCallback,
		});
	});

});
