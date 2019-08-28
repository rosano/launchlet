import { throws, deepEqual } from 'assert';
import { JSDOM } from 'jsdom';

import * as mainModule from './main.js';

describe('LCHLinkElements', function testLCHLinkElements() {

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHLinkElements(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws if not DOMDocument', function() {
		throws(function() {
			mainModule.LCHLinkElements({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('')), []);
	});

	it('excludes if no href', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="">alfa</a>')), []);
	});

	it('excludes if no textContent or title', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="#"></a>')), []);
	});

	it('excludes if textContent only whitespace', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="#"> </a>')), []);
	});

	it('excludes if title only whitespace', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="#" title=" "></a>')), []);
	});

	it('includes if textContent', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="#">alfa</a>')).pop().LCHRecipeName, 'alfa');
	});

	it('includes if title', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="#" title="alfa"></a>')).pop().LCHRecipeName, 'alfa');
	});

	it('prefers textContent if both', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="#" title="bravo">alfa</a>')).pop().LCHRecipeName, 'alfa');
	});

	it('sets LCHRecipeOutputType to DOMElement', function() {
		deepEqual(mainModule.LCHLinkElements(JSDOM.fragment('<a href="#" title="#">alfa</a>')).pop().LCHRecipeOutputType, 'DOMElement');
	});

});

describe('LCHActiveDocumentLinkElementsCallback', function testLCHActiveDocumentLinkElementsCallback() {

});

describe('LCHActiveDocumentLinkElementsRecipe', function testLCHActiveDocumentLinkElementsRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHActiveDocumentLinkElementsRecipe(), {
			LCHRecipeName: 'Active Document Link Elements',
			LCHRecipeCallback: mainModule.LCHActiveDocumentLinkElementsCallback,
			LCHRecipeOutputType: 'SubjectContainer',
			LCHRecipeSignature: 'LCHActiveDocumentLinkElements',
		});
	});

});
