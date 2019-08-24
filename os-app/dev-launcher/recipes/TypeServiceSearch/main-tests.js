import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeServiceSearchCallback', function testLCHTypeServiceSearchCallback() {

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns false if LCHRecipeOutputType not ServiceSearchURLTemplate', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(mainModule.LCHTypeServiceSearchCanonicalExampleCallback()), true);
	});

});

describe('LCHTypeServiceSearchCanonicalExampleCallback', function testLCHTypeServiceSearchCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHTypeServiceSearchCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeName', function() {
		
		it('assigns string', function() {
			deepEqual(mainModule.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

	context('LCHRecipeCallback', function() {
		
		it('assigns function', function() {
			deepEqual(typeof mainModule.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});
		
		it('returns string', function() {
			deepEqual(mainModule.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeCallback(), 'http://example.com?q=LCHSEARCHTOKEN');
		});

	});

	context('LCHRecipeOutputType', function() {
		
		it('assigns string', function() {
			deepEqual(mainModule.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeOutputType, 'ServiceSearchURLTemplate');
		});

	});

});

describe('LCHTypeServiceSearchRecipe', function testLCHTypeServiceSearchRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeServiceSearchRecipe(), {
			LCHRecipeName: 'Search Service',
			LCHRecipeCallback: mainModule.LCHTypeServiceSearchCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback: mainModule.LCHTypeServiceSearchCanonicalExampleCallback,
			LCHRecipeSignature: 'ServiceSearch',
		});
	});

});
