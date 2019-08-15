import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeServiceSearchCallback', function testLCHTypeServiceSearchCallback() {

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if no arguments', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeCallback () {},
		})), false);
	});

	it('returns false if more than one argument', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeCallback (alfa, bravo) {},
		})), false);
	});

	it('returns false if LCHRecipeOutputType not URL', function() {
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

	context('LCHRecipeCallback', function() {
		
		it('returns function', function() {
			deepEqual(typeof mainModule.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

	context('LCHRecipeName', function() {
		
		it('returns string', function() {
			deepEqual(mainModule.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeName, 'bravo');
		});

	});

	context('LCHRecipeOutputType', function() {
		
		it('returns string', function() {
			deepEqual(mainModule.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeOutputType, 'URL');
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
