import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeServiceSearchURLTemplateCallback', function testLCHTypeServiceSearchURLTemplateCallback() {

	it('returns false if not URL', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('://example'), false);
	});

	it('returns false if no token match', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCH+SEARCH+TOKE'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCH+SEARCH+TOKEN'), true);
	});

	it('matches +', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCH+SEARCH+TOKEN'), true);
	});

	it('matches space', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCH SEARCH TOKEN'), true);
	});

	it('matches encoded space', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=LCH%20SEARCH%20TOKEN'), true);
	});

	it('matches lowercase', function() {
		deepEqual(mainModule.LCHTypeServiceSearchURLTemplateCallback('http://example.com?q=lch+search+token'), true);
	});

});

describe('LCHTypeStringCanonicalExampleCallback', function testLCHTypeStringCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHTypeStringCanonicalExampleCallback(), 'http://example.com?q=LCH+SEARCH+TOKEN');
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
