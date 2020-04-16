const { throws, deepEqual } = require('assert');
import { JSDOM } from 'jsdom';

const mainModule = require('./main.js');

describe('LCHActiveDocumentsFocusElements', function test_LCHActiveDocumentsFocusElements() {

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHActiveDocumentsFocusElements(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if not DOMDocument', function() {
		throws(function() {
			mainModule.LCHActiveDocumentsFocusElements({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('')), []);
	});

	context('FocusElementAnchor', function test_FocusElementAnchor () {

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

	context('FocusElementInput', function test_FocusElementInput () {
		
		it('excludes if name only whitespace', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input name=" " />')), []);
		});

		it('excludes if placeholder only whitespace', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input placeholder=" " />')), []);
		});

		it('excludes if label only whitespace', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input id="alfa" /><label for"alfa"> </label>')), []);
		});

		it('excludes if type hidden', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input type="hidden" name="alfa" />')), []);
		});

		it('excludes if disabled', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input name="alfa" disabled />')), []);
		});

		it('excludes if tabindex -1', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input name="alfa" tabindex="-1" />')), []);
		});

		it('includes if label', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input id="alfa" /><label for="alfa">bravo</label>')).length, 1);
		});

		it('includes if placeholder', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input placeholder="alfa" />')).length, 1);
		});

		it('includes if name', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input name="alfa" />')).length, 1);
		});

		context('LCHRecipeName', function () {

			it('sets to label', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input id="alfa" /><label for="alfa">bravo</label>')).pop().LCHRecipeName, 'bravo');
			});

			it('sets to placeholder', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input placeholder="alfa" />')).pop().LCHRecipeName, 'alfa');
			});

			it('sets to name', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input name="alfa" />')).pop().LCHRecipeName, 'alfa');
			});

			it('prefers label', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input id="alfa" /><label for="alfa">bravo</label>')).pop().LCHRecipeName, 'bravo');
			});

			it('prefers placeholder if no label', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input placeholder="alfa" />')).pop().LCHRecipeName, 'alfa');
			});

			it('prefers name if no placeholder', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input name="alfa" />')).pop().LCHRecipeName, 'alfa');
			});
		
		});

		context('LCHRecipeOutputType', function () {

			it('assigns DOMElement', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<input name="alfa" />')).pop().LCHRecipeOutputType, 'DOMElement');
			});
		
		});
	
	});

	context('FocusElementButton', function test_FocusElementButton () {
		
		it('excludes if textContent only whitespace', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<button> </button>')), []);
		});
		
		it('excludes if disabled', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<button disabled>alfa</button>')), []);
		});
		
		it('excludes if tabindex -1', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<button tabindex="-1">alfa</button>')), []);
		});

		it('includes', function() {
			deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<button>alfa</button>')).length, 1);
		});

		context('LCHRecipeName', function () {

			it('sets to textContent', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<button>alfa</button>')).pop().LCHRecipeName, 'alfa');
			});
		
		});

		context('LCHRecipeOutputType', function () {

			it('assigns DOMElement', function() {
				deepEqual(mainModule.LCHActiveDocumentsFocusElements(JSDOM.fragment('<button>alfa</button>')).pop().LCHRecipeOutputType, 'DOMElement');
			});
		
		});
	
	});

});

describe('LCHActiveDocumentFocusElementsCallback', function test_LCHActiveDocumentFocusElementsCallback() {

});

describe('LCHActiveDocumentFocusElementsRecipe', function test_LCHActiveDocumentFocusElementsRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHActiveDocumentFocusElementsRecipe(), {
			LCHRecipeSignature: 'LCHActiveDocumentFocusElements',
			LCHRecipeCallback: mainModule.LCHActiveDocumentFocusElementsCallback,
			LCHRecipeOutputType: 'SubjectContainer',
		});
	});

});
