const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHTypeCommandCallback', function test_LCHTypeCommandCallback() {

	it.skip('throws error if not valid', function() {
		throws(function() {
			mod.LCHTypeCommandCallback({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mod.LCHTypeCommandCallback(Object.assign(mod.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mod.LCHTypeCommandCallback(Object.assign(mod.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHTypeCommandCallback(mod.LCHTypeStringCanonicalExampleCallback()), true);
	});

});

describe('LCHTypeStringCanonicalExampleCallback', function test_LCHTypeStringCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mod.LCHTypeStringCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeName', function() {
		
		it('returns string', function() {
			deepEqual(mod.LCHTypeStringCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

	context('LCHRecipeCallback', function() {
		
		it('returns function', function() {
			deepEqual(typeof mod.LCHTypeStringCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

});

describe('LCHTypeCommandRecipe', function test_LCHTypeCommandRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHTypeCommandRecipe(), {
			LCHRecipeSignature: 'Command',
			LCHRecipeCallback: mod.LCHTypeCommandCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHTypeStringCanonicalExampleCallback,
		});
	});

});
