const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHPrimitiveStringCallback', function testLCHPrimitiveStringCallback() {

	it('returns false if not string', function() {
		deepEqual(mainModule.LCHPrimitiveStringCallback(null), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveStringCallback(''), true);
	});

});

describe('LCHPrimitiveStringCanonicalExampleCallback', function testLCHPrimitiveStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHPrimitiveStringCanonicalExampleCallback(), '');
	});

});

describe('LCHPrimitiveStringRecipe', function testLCHPrimitiveStringRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveStringRecipe(), {
			LCHRecipeSignature: 'String',
			LCHRecipeCallback: mainModule.LCHPrimitiveStringCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHPrimitiveStringCanonicalExampleCallback,
		});
	});

});
