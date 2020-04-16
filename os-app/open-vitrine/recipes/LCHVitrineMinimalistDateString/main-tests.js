const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHVitrineMinimalistDateStringCallback', function test_LCHVitrineMinimalistDateStringCallback() {

	it('returns string', async function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringCallback(), (new Date()).toJSON().slice(0, 10).replace(/-/g, '.'));
	});

});

describe('LCHVitrineMinimalistDateStringRecipe', function test_LCHVitrineMinimalistDateStringRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineMinimalistDateStringCallback,
			LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
			LCHRecipeOutputType: 'String',
		});
	});

});
