import { throws, deepEqual } from 'assert';
import { JSDOM } from 'jsdom';

import * as mainModule from './main.js';

describe('LCHInputElements', function testLCHInputElements() {

	// - exclude type=hidden buttons and display none, visibility hidden

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHInputElements(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws if not DOMDocument', function() {
		throws(function() {
			mainModule.LCHInputElements({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHInputElements(JSDOM.fragment('')), []);
	});

	it('excludes if name only whitespace', function() {
		deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input name=" " />')), []);
	});

	it('excludes if placeholder only whitespace', function() {
		deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input placeholder=" " />')), []);
	});

	it('excludes if label only whitespace', function() {
		deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input id="alfa" /><label for"alfa"> </label>')), []);
	});

	it('excludes if type hidden', function() {
		deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input type="hidden" name="alfa" />')), []);
	});

	context('LCHRecipeName', function () {

		it.skip('prefers label', function() {
			deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input id="alfa" /><label for"alfa">bravo</label>')).pop().LCHRecipeName, 'bravo');
		});

		it('prefers placeholder if no label', function() {
			deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input placeholder="alfa" />')).pop().LCHRecipeName, 'alfa');
		});

		it('prefers name if no placeholder', function() {
			deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input name="alfa" />')).pop().LCHRecipeName, 'alfa');
		});
	
	});

	context('LCHRecipeOutputType', function () {

		it('assigns DOMElement', function() {
			deepEqual(mainModule.LCHInputElements(JSDOM.fragment('<input name="alfa" />')).pop().LCHRecipeOutputType, 'DOMElement');
		});
	
	});

});

describe('LCHActiveDocumentInputElementsCallback', function testLCHActiveDocumentInputElementsCallback() {

});

describe('LCHActiveDocumentInputElementsRecipe', function testLCHActiveDocumentInputElementsRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHActiveDocumentInputElementsRecipe(), {
			LCHRecipeName: 'Active Document Input Elements',
			LCHRecipeCallback: mainModule.LCHActiveDocumentInputElementsCallback,
			LCHRecipeOutputType: 'SubjectContainer',
			LCHRecipeSignature: 'LCHActiveDocumentInputElements',
		});
	});

});
