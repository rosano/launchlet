import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrineSendEmailRecipe', function testLCHVitrineSendEmailRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineSendEmailRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineSendEmailCallback,
			LCHRecipeSignature: 'LCHVitrineSendEmail',
		});
	});

});
