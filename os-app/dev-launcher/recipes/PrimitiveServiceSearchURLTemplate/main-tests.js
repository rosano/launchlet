import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHPrimitiveServiceSearchURLTemplateCallback', function testLCHPrimitiveServiceSearchURLTemplateCallback() {

	it('returns false if not URL', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('://example'), false);
	});

	it('returns false if no token match', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKE'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1'), true);
	});

	it('matches lowercase', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=lchsearchtoken'), true);
	});

});

describe('LCHPrimitiveStringCanonicalExampleCallback', function testLCHPrimitiveStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHPrimitiveStringCanonicalExampleCallback(), 'http://example.com?q=LCHSEARCHTOKEN');
	});

});

describe('LCHPrimitiveServiceSearchURLTemplateRecipe', function testLCHPrimitiveServiceSearchURLTemplateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateRecipe(), {
			LCHRecipeName: 'Search Service URL Template',
			LCHRecipeSignature: 'ServiceSearchURLTemplate',
			LCHRecipeCallback: mainModule.LCHPrimitiveServiceSearchURLTemplateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback: mainModule.LCHPrimitiveStringCanonicalExampleCallback,
			_LCHRecipeNonEquivalenceTypes: 'String,URL',
		});
	});

});
