const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHDOMElementFocusCallback', function test_LCHDOMElementFocusCallback() {

	it('returns undefined', function() {
		deepEqual(mainModule.LCHDOMElementFocusCallback(), undefined);
	});

});

describe('LCHDOMElementFocusRecipe', function test_LCHDOMElementFocusRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHDOMElementFocusRecipe(), {
			LCHRecipeSignature: 'LCHDOMElementFocus',
			LCHRecipeInputTypes: 'DOMElement',
			LCHRecipeCallback: mainModule.LCHDOMElementFocusCallback,
		});
	});

});
