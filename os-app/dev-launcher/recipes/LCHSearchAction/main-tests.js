import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHSearchActionURLFrom', function testLCHSearchActionURLFrom() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHSearchActionURLFrom(null, '');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHSearchActionURLFrom('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns param1', function() {
		deepEqual(mainModule.LCHSearchActionURLFrom('alfa', ''), 'alfa');
	});

	describe('search token', function() {

		it('replaces with param2', function() {
			deepEqual(mainModule.LCHSearchActionURLFrom('alfa?LCHSEARCHTOKEN1+LCHSEARCHTOKEN2', 'bravo'), 'alfa?bravo');
		});

		it('substitutes delimiters', function() {
			deepEqual(mainModule.LCHSearchActionURLFrom('LCHSEARCHTOKEN1+LCHSEARCHTOKEN2', 'bravo charlie'), 'bravo+charlie');
		});

		it('matches %20', function() {
			deepEqual(mainModule.LCHSearchActionURLFrom('LCHSEARCHTOKEN1%20LCHSEARCHTOKEN2', 'bravo charlie'), 'bravo%20charlie');
		});

		it('escapes ampersand', function() {
			deepEqual(mainModule.LCHSearchActionURLFrom('LCHSEARCHTOKEN1+LCHSEARCHTOKEN2', 'bravo & charlie'), 'bravo+%26+charlie');
		});

	});

});

describe('LCHSearchWithCallback', function testLCHSearchWithCallback() {

	it('calls api with result', async function() {
		deepEqual(mainModule.LCHSearchWithCallback.bind({
			api: {
				fn () {
					return function (inputData) {
						return [inputData, 'bravo'];
					};
				},
			},
		})('alfa', {
			LCHRecipeCallback: function () {
				return `example.com/LCHSEARCHTOKEN1+LCHSEARCHTOKEN2`;
			},
		}), ['example.com/alfa', 'bravo']);
	});

});

describe('LCHSearchWithRecipe', function testLCHSearchWithRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHSearchWithRecipe(), {
			LCHRecipeName: 'Search With',
			LCHRecipeSignature: 'LCHSearchWith',
			LCHRecipeInputTypes: 'String,ServiceSearchURLTemplate',
			LCHRecipeCallback: mainModule.LCHSearchWithCallback,
		});
	});

});
