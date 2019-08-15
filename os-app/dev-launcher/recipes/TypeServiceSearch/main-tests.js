import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeServiceSearchCallback', function testLCHTypeServiceSearchCallback() {

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if no arguments', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeCallback () {},
		})), false);
	});

	it('returns false if more than one argument', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeCallback (alfa, bravo) {},
		})), false);
	});

	it('returns false if LCHRecipeOutputType not URL', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(Object.assign(mainModule.LCHTypeStringCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeServiceSearchCallback(mainModule.LCHTypeStringCanonicalExampleCallback()), true);
	});

});

describe('LCHTypeStringCanonicalExampleCallback', function testLCHTypeStringCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHTypeStringCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeCallback', function() {
		
		it('returns function', function() {
			deepEqual(typeof mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

	context('LCHRecipeName', function() {
		
		it('returns string', function() {
			deepEqual(mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeName, 'bravo');
		});

	});

	context('LCHRecipeOutputType', function() {
		
		it('returns string', function() {
			deepEqual(mainModule.LCHTypeStringCanonicalExampleCallback().LCHRecipeOutputType, 'URL');
		});

	});

});

describe('LCHTypeServiceSearchRecipe', function testLCHTypeServiceSearchRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeServiceSearchRecipe(), {
			LCHRecipeName: 'Search Service',
			LCHRecipeSignature: 'ServiceSearch',
			LCHRecipeCallback: mainModule.LCHTypeServiceSearchCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback: mainModule.LCHTypeStringCanonicalExampleCallback,
		});
	});

});
