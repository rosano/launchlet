import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHDOMElementFocusCallback', function testLCHDOMElementFocusCallback() {

	it('returns undefined', async function() {
		deepEqual(typeof mainModule.LCHDOMElementFocusCallback(), 'undefined');
	});

});

describe('LCHDOMElementFocusRecipe', function testLCHDOMElementFocusRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHDOMElementFocusRecipe(), {
			LCHRecipeName: 'Focus',
			LCHRecipeSignature: 'LCHDOMElementFocus',
			LCHRecipeInputTypes: 'DOMElement',
			LCHRecipeCallback: mainModule.LCHDOMElementFocusCallback,
		});
	});

});
