import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHPrimitiveServiceSearchURLTemplateCallback', function testLCHPrimitiveServiceSearchURLTemplateCallback() {

	it('returns false if not URL', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('://example'), false);
	});

	it('returns false if no token match', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2'), true);
	});

	it('matches +', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2'), true);
	});

	it('matches space', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1 LCHSEARCHTOKEN2'), true);
	});

	it('matches encoded space', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1%20LCHSEARCHTOKEN2'), true);
	});

	it('matches lowercase', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=lchsearchtoken1+lchsearchtoken2'), true);
	});

});

describe('LCHPrimitiveStringCanonicalExampleCallback', function testLCHPrimitiveStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHPrimitiveStringCanonicalExampleCallback(), 'http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2');
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
		});
	});

});
