const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHPrimitiveDOMElementCallback', function test_LCHPrimitiveDOMElementCallback() {

	it('returns false if not object', function() {
		deepEqual(mainModule.LCHPrimitiveDOMElementCallback(null), false);
	});

	it('returns false if focus not function', function() {
		deepEqual(mainModule.LCHPrimitiveDOMElementCallback({}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveDOMElementCallback(mainModule.LCHPrimitiveDOMElementCanonicalExampleCallback()), true);
	});

});

describe('LCHPrimitiveDOMElementCanonicalExampleCallback', function test_LCHPrimitiveDOMElementCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHPrimitiveDOMElementCanonicalExampleCallback(), 'object');
	});

	context('focus', function () {
		
		it('assigns function', function() {
			deepEqual(typeof mainModule.LCHPrimitiveDOMElementCanonicalExampleCallback().focus, 'function');
		});
	
	});

});

describe('LCHPrimitiveDOMElementRecipe', function test_LCHPrimitiveDOMElementRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveDOMElementRecipe(), {
			LCHRecipeSignature: 'DOMElement',
			LCHRecipeCallback: mainModule.LCHPrimitiveDOMElementCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHPrimitiveDOMElementCanonicalExampleCallback,
			_LCHRecipeTypeIsExclusive: true,
		});
	});

});
