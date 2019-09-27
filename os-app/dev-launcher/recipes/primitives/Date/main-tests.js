import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHPrimitiveDateCallback', function testLCHPrimitiveDateCallback() {

	it('returns false if not date', function() {
		deepEqual(mainModule.LCHPrimitiveDateCallback(null), false);
	});

	it('returns false if invalid', function() {
		deepEqual(mainModule.LCHPrimitiveDateCallback(new Date('alfa')), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveDateCallback(new Date()), true);
	});

});

describe('LCHPrimitiveDateCanonicalExampleCallback', function testLCHPrimitiveDateCanonicalExampleCallback() {

	it('returns Date', function() {
		deepEqual(mainModule.LCHPrimitiveDateCanonicalExampleCallback(), new Date(0));
	});

});

describe('LCHPrimitiveDateRecipe', function testLCHPrimitiveDateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveDateRecipe(), {
			LCHRecipeSignature: 'Date',
			LCHRecipeCallback: mainModule.LCHPrimitiveDateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHPrimitiveDateCanonicalExampleCallback,
		});
	});

});
