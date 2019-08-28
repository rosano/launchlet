import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHPrimitiveDOMElementCallback', function testLCHPrimitiveDOMElementCallback() {

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

describe('LCHPrimitiveDOMElementCanonicalExampleCallback', function testLCHPrimitiveDOMElementCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHPrimitiveDOMElementCanonicalExampleCallback(), 'object');
	});

	context('focus', function () {
		
		it('assigns function', function() {
			deepEqual(typeof mainModule.LCHPrimitiveDOMElementCanonicalExampleCallback().focus, 'function')
		});
	
	});

});

describe('LCHPrimitiveDOMElementRecipe', function testLCHPrimitiveDOMElementRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveDOMElementRecipe(), {
			LCHRecipeName: 'DOM Element',
			LCHRecipeSignature: 'DOMElement',
			LCHRecipeCallback: mainModule.LCHPrimitiveDOMElementCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHPrimitiveDOMElementCanonicalExampleCallback,
			_LCHRecipeTypeIsExclusive: true,
		});
	});

});
