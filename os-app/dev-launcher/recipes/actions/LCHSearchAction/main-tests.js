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
			deepEqual(mainModule.LCHSearchActionURLFrom('alfa?LCHSEARCHTOKEN', 'bravo'), 'alfa?bravo');
		});

		it('replaces case insensitive', function() {
			deepEqual(mainModule.LCHSearchActionURLFrom('alfa?lchsearchtoken', 'bravo'), 'alfa?bravo');
		});

		it('substitutes spaces', function() {
			deepEqual(mainModule.LCHSearchActionURLFrom('LCHSEARCHTOKEN', 'bravo charlie'), 'bravo+charlie');
		});

		it('escapes ampersand', function() {
			deepEqual(mainModule.LCHSearchActionURLFrom('LCHSEARCHTOKEN', 'bravo & charlie'), 'bravo+%26+charlie');
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
		})('alfa', 'example.com/LCHSEARCHTOKEN'), ['example.com/alfa', 'bravo']);
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

describe('LCHSearchForCallback', function testLCHSearchForCallback() {

	it('calls LCHFlip with LCHSearchWithCallback', async function() {
		deepEqual(mainModule.LCHSearchForCallback.bind({
			api: {
				fn () {
					return function (inputData) {
						return [inputData, 'bravo'];
					};
				},
			},
		})('example.com/LCHSEARCHTOKEN', 'alfa'), ['example.com/alfa', 'bravo']);
	});

});

describe('LCHSearchForRecipe', function testLCHSearchForRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHSearchForRecipe(), {
			LCHRecipeName: 'Search For',
			LCHRecipeSignature: 'LCHSearchFor',
			LCHRecipeInputTypes: 'ServiceSearchURLTemplate,String',
			LCHRecipeCallback: mainModule.LCHSearchForCallback,
		});
	});

});
