import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHSearchWithCallback', function testLCHSearchWithCallback() {

	it('calls api with result', async function() {
		deepEqual(mainModule.LCHSearchWithCallback.bind({
			api: {
				fn () {
					return function (inputData) {
						return [inputData, 'bravo'];
					}
				},
			},
		})('alfa', {
			LCHRecipeCallback: function (inputData) {
				return `example.com/${ inputData }`;
			},
		}), ['example.com/alfa', 'bravo']);
	});

});

describe('LCHSearchWithRecipe', function testLCHSearchWithRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHSearchWithRecipe(), {
			LCHRecipeName: 'Search With',
			LCHRecipeSignature: 'LCHSearchWith',
			LCHRecipeInputTypes: 'String,ServiceSearch',
			LCHRecipeCallback: mainModule.LCHSearchWithCallback,
		});
	});

});
