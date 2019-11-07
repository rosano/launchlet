const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHDOMElementFocusCallback', function testLCHDOMElementFocusCallback() {

	it('returns undefined', function() {
		deepEqual(mainModule.LCHDOMElementFocusCallback(), undefined);
	});

});

describe('LCHDOMElementFocusRecipe', function testLCHDOMElementFocusRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHDOMElementFocusRecipe(), {
			LCHRecipeSignature: 'LCHDOMElementFocus',
			LCHRecipeInputTypes: 'DOMElement',
			LCHRecipeCallback: mainModule.LCHDOMElementFocusCallback,
		});
	});

});
