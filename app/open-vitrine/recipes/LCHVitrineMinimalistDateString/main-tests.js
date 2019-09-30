import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHVitrineMinimalistDateStringCallback', function testLCHVitrineMinimalistDateStringCallback() {

	it('returns string', async function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringCallback(), (new Date()).toJSON().slice(0, 10).replace(/-/g, '.'));
	});

});

describe('LCHVitrineMinimalistDateStringRecipe', function testLCHVitrineMinimalistDateStringRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineMinimalistDateStringCallback,
			LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
			LCHRecipeOutputType: 'String',
		});
	});

});
