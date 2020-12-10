const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHDOMElementFocusCallback', function test_LCHDOMElementFocusCallback() {

	it('returns undefined', function() {
		deepEqual(mod.LCHDOMElementFocusCallback(), undefined);
	});

});

describe('LCHDOMElementFocusRecipe', function test_LCHDOMElementFocusRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHDOMElementFocusRecipe(), {
			LCHRecipeSignature: 'LCHDOMElementFocus',
			LCHRecipeInputTypes: 'DOMElement',
			LCHRecipeCallback: mod.LCHDOMElementFocusCallback,
		});
	});

});
