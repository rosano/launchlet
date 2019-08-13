import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHLargeTypeCallback', function testLCHLargeTypeCallback() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHLargeTypeCallback(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns undefined', async function() {
		deepEqual(mainModule.LCHLargeTypeCallback('alfa'), undefined);
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
