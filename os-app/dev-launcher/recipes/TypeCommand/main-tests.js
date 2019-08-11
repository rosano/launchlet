import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeCommandCallback', function testLCHTypeCommandCallback() {

	it.skip('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHTypeCommandCallback({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeTitle', function() {
		deepEqual(mainModule.LCHTypeCommandCallback(Object.assign(mainModule.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeTitle: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHTypeCommandCallback(Object.assign(mainModule.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeCommandCallback(mainModule.LCHTypeStringCanonicalExampleCallback()), true);
	});

});

describe('LCHTypeStringCanonicalExampleCallback', function testLCHTypeStringCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHTypeStringCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeCallback', function() {
		
		it('returns function', function() {
			deepEqual(typeof mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

	context('LCHRecipeTitle', function() {
		
		it('returns function', function() {
			deepEqual(mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeTitle, 'alfa');
		});

	});

});

describe('LCHTypeCommandRecipe', function testLCHTypeCommandRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeCommandRecipe(), {
			LCHRecipeTitle: 'Command',
			LCHRecipeSignature: 'Command',
			LCHRecipeCallback: mainModule.LCHTypeCommandCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback: mainModule.LCHTypeStringCanonicalExampleCallback,
		});
	});

});
