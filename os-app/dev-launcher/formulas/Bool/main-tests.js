import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeBoolCallback', function testLCHTypeBoolCallback() {

	it('returns false', async function() {
		deepEqual(mainModule.LCHTypeBoolCallback(), false);
	});

	it('returns false if undefined', async function() {
		deepEqual(mainModule.LCHTypeBoolCallback(undefined), false);
	});

	it('returns false if null', async function() {
		deepEqual(mainModule.LCHTypeBoolCallback(null), false);
	});

	it('returns false if empty string', async function() {
		deepEqual(mainModule.LCHTypeBoolCallback(''), false);
	});

	it('returns true if true', async function() {
		deepEqual(mainModule.LCHTypeBoolCallback(true), true);
	});

	it('returns true if filled string', async function() {
		deepEqual(mainModule.LCHTypeBoolCallback('alfa'), true);
	});

});

describe('LCHTypeBool', function testLCHTypeBool() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHTypeBool(), {
			LCHRecipeName: 'Boolean',
			LCHRecipeSignature: 'Bool',
			LCHRecipeCallback: mainModule.LCHTypeBoolCallback,
		});
	});

});