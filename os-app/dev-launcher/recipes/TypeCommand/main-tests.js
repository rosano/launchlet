import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeCommandCallback', function testLCHTypeCommandCallback() {

	it.skip('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHTypeCommandCallback({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHTypeCommandCallback(Object.assign(mainModule.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
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

	context('LCHRecipeName', function() {
		
		it('returns function', function() {
			deepEqual(mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

});

describe('LCHTypeCommandRecipe', function testLCHTypeCommandRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeCommandRecipe(), {
			LCHRecipeName: 'Command',
			LCHRecipeSignature: 'Command',
			LCHRecipeCallback: mainModule.LCHTypeCommandCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback: mainModule.LCHTypeStringCanonicalExampleCallback,
		});
	});

});
