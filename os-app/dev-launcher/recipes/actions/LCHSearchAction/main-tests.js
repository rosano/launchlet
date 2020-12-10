const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHSearchActionURLFrom', function test_LCHSearchActionURLFrom() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mod.LCHSearchActionURLFrom(null, '');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.LCHSearchActionURLFrom('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns param1', function() {
		deepEqual(mod.LCHSearchActionURLFrom('alfa', ''), 'alfa');
	});

	describe('search token', function() {

		it('replaces with param2', function() {
			deepEqual(mod.LCHSearchActionURLFrom('alfa?LCHSEARCHTOKEN', 'bravo'), 'alfa?bravo');
		});

		it('replaces case insensitive', function() {
			deepEqual(mod.LCHSearchActionURLFrom('alfa?lchsearchtoken', 'bravo'), 'alfa?bravo');
		});

		it('substitutes spaces', function() {
			deepEqual(mod.LCHSearchActionURLFrom('LCHSEARCHTOKEN', 'bravo charlie'), 'bravo+charlie');
		});

		it('escapes ampersand', function() {
			deepEqual(mod.LCHSearchActionURLFrom('LCHSEARCHTOKEN', 'bravo & charlie'), 'bravo+%26+charlie');
		});

	});

});

describe('LCHSearchWithCallback', function test_LCHSearchWithCallback() {

	it('calls api with result', function() {
		deepEqual(mod.LCHSearchWithCallback.bind({
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

describe('LCHSearchWithRecipe', function test_LCHSearchWithRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHSearchWithRecipe(), {
			LCHRecipeSignature: 'LCHSearchWith',
			LCHRecipeInputTypes: 'String,ServiceSearchURLTemplate',
			LCHRecipeCallback: mod.LCHSearchWithCallback,
		});
	});

});

describe('LCHSearchForCallback', function test_LCHSearchForCallback() {

	it('calls LCHFlip with LCHSearchWithCallback', function() {
		deepEqual(mod.LCHSearchForCallback.bind({
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

describe('LCHSearchForRecipe', function test_LCHSearchForRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHSearchForRecipe(), {
			LCHRecipeSignature: 'LCHSearchFor',
			LCHRecipeInputTypes: 'ServiceSearchURLTemplate,String',
			LCHRecipeCallback: mod.LCHSearchForCallback,
		});
	});

});
