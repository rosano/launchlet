const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHVitrineSendEmailRecipe', function testLCHVitrineSendEmailRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineSendEmailRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineSendEmailCallback,
			LCHRecipeSignature: 'LCHVitrineSendEmail',
		});
	});

});
