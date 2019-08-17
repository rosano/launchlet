import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeDateCallback', function testLCHTypeDateCallback() {

	it('returns false if not date', function() {
		deepEqual(mainModule.LCHTypeDateCallback(null), false);
	});

	it('returns false if invalid', function() {
		deepEqual(mainModule.LCHTypeDateCallback(new Date('alfa')), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeDateCallback(new Date()), true);
	});

});

describe('LCHTypeDateCanonicalExampleCallback', function testLCHTypeDateCanonicalExampleCallback() {

	it('returns Date', function() {
		deepEqual(mainModule.LCHTypeDateCanonicalExampleCallback(), new Date(0));
	});

});

describe('LCHTypeDateRecipe', function testLCHTypeDateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeDateRecipe(), {
			LCHRecipeName: 'Date',
			LCHRecipeSignature: 'Date',
			LCHRecipeCallback: mainModule.LCHTypeDateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback: mainModule.LCHTypeDateCanonicalExampleCallback,
		});
	});

});
