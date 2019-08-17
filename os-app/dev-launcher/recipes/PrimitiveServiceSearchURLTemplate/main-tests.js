import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeServiceSearchURLTemplateCallback', function testLCHTypeServiceSearchURLTemplateCallback() {

	it('returns false if not URL', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('://example'), false);
	});

	it('returns false if no token match', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2'), true);
	});

	it('matches +', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2'), true);
	});

	it('matches space', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1 LCHSEARCHTOKEN2'), true);
	});

	it('matches encoded space', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1%20LCHSEARCHTOKEN2'), true);
	});

	it('matches lowercase', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=lchsearchtoken1+lchsearchtoken2'), true);
	});

});

describe('LCHTypeStringCanonicalExampleCallback', function testLCHTypeStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHTypeStringCanonicalExampleCallback(), 'http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2');
	});

});

describe('LCHTypeServiceSearchURLTemplateRecipe', function testLCHTypeServiceSearchURLTemplateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateRecipe(), {
			LCHRecipeName: 'Search Service URL Template',
			LCHRecipeSignature: 'ServiceSearchURLTemplate',
			LCHRecipeCallback: mainModule.LCHTypeServiceSearchURLTemplateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback: mainModule.LCHTypeStringCanonicalExampleCallback,
		});
	});

});
