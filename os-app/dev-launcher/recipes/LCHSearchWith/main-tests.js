import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHSearchWithURLFrom', function testLCHSearchWithURLFrom() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHSearchWithURLFrom(null, '');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHSearchWithURLFrom('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns param1', function() {
		deepEqual(mainModule.LCHSearchWithURLFrom('alfa', ''), 'alfa');
	});

	describe('search token', function() {

		it('replaces with param2', function() {
			deepEqual(mainModule.LCHSearchWithURLFrom('alfa?LCH+SEARCH+TOKEN', 'bravo'), 'alfa?bravo');
		});

		it('substitutes delimiters', function() {
			deepEqual(mainModule.LCHSearchWithURLFrom('LCH+SEARCH+TOKEN', 'bravo charlie'), 'bravo+charlie');
		});

		it('matches %20', function() {
			deepEqual(mainModule.LCHSearchWithURLFrom('LCH%20SEARCH%20TOKEN', 'bravo charlie'), 'bravo%20charlie');
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
			LCHRecipeInputTypes: 'String,ServiceSearchURLTemplate',
			LCHRecipeCallback: mainModule.LCHSearchWithCallback,
		});
	});

});
