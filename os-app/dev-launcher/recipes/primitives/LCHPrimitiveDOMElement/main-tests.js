const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHPrimitiveDOMElementCallback', function test_LCHPrimitiveDOMElementCallback() {

	it('returns false if not object', function() {
		deepEqual(mod.LCHPrimitiveDOMElementCallback(null), false);
	});

	it('returns false if focus not function', function() {
		deepEqual(mod.LCHPrimitiveDOMElementCallback({}), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHPrimitiveDOMElementCallback(mod.LCHPrimitiveDOMElementCanonicalExampleCallback()), true);
	});

});

describe('LCHPrimitiveDOMElementCanonicalExampleCallback', function test_LCHPrimitiveDOMElementCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mod.LCHPrimitiveDOMElementCanonicalExampleCallback(), 'object');
	});

	context('focus', function () {
		
		it('assigns function', function() {
			deepEqual(typeof mod.LCHPrimitiveDOMElementCanonicalExampleCallback().focus, 'function');
		});
	
	});

});

describe('LCHPrimitiveDOMElementRecipe', function test_LCHPrimitiveDOMElementRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHPrimitiveDOMElementRecipe(), {
			LCHRecipeSignature: 'DOMElement',
			LCHRecipeCallback: mod.LCHPrimitiveDOMElementCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHPrimitiveDOMElementCanonicalExampleCallback,
			_LCHRecipeTypeIsExclusive: true,
		});
	});

});
