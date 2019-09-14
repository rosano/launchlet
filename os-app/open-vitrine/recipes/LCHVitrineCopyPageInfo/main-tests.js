import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrineCopyPageInfoRecipe', function testLCHVitrineCopyPageInfoRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineCopyPageInfoRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineCopyPageInfoCallback,
			LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
		});
	});

});
