import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeBoolCallback', function testLCHTypeBoolCallback() {

	it('returns false', function() {
		deepEqual(mainModule.LCHTypeBoolCallback(), false);
	});

	it('returns false if undefined', function() {
		deepEqual(mainModule.LCHTypeBoolCallback(undefined), false);
	});

	it('returns false if null', function() {
		deepEqual(mainModule.LCHTypeBoolCallback(null), false);
	});

	it('returns false if empty string', function() {
		deepEqual(mainModule.LCHTypeBoolCallback(''), false);
	});

	it('returns true if true', function() {
		deepEqual(mainModule.LCHTypeBoolCallback(true), true);
	});

	it('returns true if filled string', function() {
		deepEqual(mainModule.LCHTypeBoolCallback('alfa'), true);
	});

});

describe('LCHTypeBoolRecipe', function testLCHTypeBoolRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeBoolRecipe(), {
			LCHRecipeName: 'Boolean',
			LCHRecipeSignature: 'Bool',
			LCHRecipeCallback: mainModule.LCHTypeBoolCallback,
		});
	});

});
