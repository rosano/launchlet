import { throws, deepEqual } from 'assert';
import { JSDOM } from 'jsdom';

import * as mainModule from './main.js';

describe('LCHActiveDocumentsFocusElements', function testLCHActiveDocumentsFocusElements() {

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHActiveDocumentsFocusElements(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws if not DOMDocument', function() {
		throws(function() {
			mainModule.LCHActiveDocumentsFocusElements({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('')), []);
	});

	context('FocusElementAnchor', function testFocusElementAnchor () {

		it('excludes if no href', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="">alfa</a>')), []);
		});

		it('excludes if no textContent or title', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#"></a>')), []);
		});

		it('excludes if textContent only whitespace', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#"> </a>')), []);
		});

		it('excludes if title only whitespace', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#" title=" "></a>')), []);
		});

		it('excludes if tabindex -1', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#" tabindex="-1">alfa</a>')), []);
		});

		it('includes if textContent', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#">alfa</a>')).length, 1);
		});

		it('includes if title', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#" title="alfa"></a>')).length, 1);
		});

		context('LCHRecipeName', function () {
			
			it('sets to textContent', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#" >alfa</a>')).pop().LCHRecipeName, 'alfa');
			});

			it('sets to title', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#" title="alfa"></a>')).pop().LCHRecipeName, 'alfa');
			});

			it('prefers textContent', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#" title="alfa">bravo</a>')).pop().LCHRecipeName, 'bravo');
			});
		
		});

		context('LCHRecipeOutputType', function () {
			
			it('sets to DOMElement', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<a href="#" title="#">alfa</a>')).pop().LCHRecipeOutputType, 'DOMElement');
			});
		
		});
	
	});

});

describe('LCHActiveDocumentFocusElementsCallback', function testLCHActiveDocumentFocusElementsCallback() {

});

describe('LCHActiveDocumentFocusElementsRecipe', function testLCHActiveDocumentFocusElementsRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHActiveDocumentFocusElementsRecipe(), {
			LCHRecipeName: 'Active Document Link Elements',
			LCHRecipeCallback: mainModule.LCHActiveDocumentFocusElementsCallback,
			LCHRecipeOutputType: 'SubjectContainer',
			LCHRecipeSignature: 'LCHActiveDocumentFocusElements',
		});
	});

});
