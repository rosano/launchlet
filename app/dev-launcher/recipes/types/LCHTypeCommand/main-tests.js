import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeCommandCallback', function testLCHTypeCommandCallback() {

	it.skip('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHTypeCommandCallback({});
		}, /LCHErrorInputNotValid/);
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

	context('LCHRecipeName', function() {

		it('returns string', function() {
			deepEqual(mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

	context('LCHRecipeCallback', function() {

		it('returns function', function() {
			deepEqual(typeof mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

});

describe('LCHTypeCommandRecipe', function testLCHTypeCommandRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeCommandRecipe(), {
			LCHRecipeSignature: 'Command',
			LCHRecipeCallback: mainModule.LCHTypeCommandCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHTypeStringCanonicalExampleCallback,
		});
	});

});
