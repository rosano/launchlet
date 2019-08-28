import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeSubjectContainerCallback', function testLCHTypeSubjectContainerCallback() {

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHTypeSubjectContainerCallback(Object.assign(mainModule.LCHTypeSubjectContainerCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if LCHRecipeOutputType not valid', function() {
		deepEqual(mainModule.LCHTypeSubjectContainerCallback(Object.assign(mainModule.LCHTypeSubjectContainerCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeSubjectContainerCallback(mainModule.LCHTypeSubjectContainerCanonicalExampleCallback()), true);
	});

});

describe('LCHTypeSubjectContainerCanonicalExampleCallback', function testLCHTypeSubjectContainerCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHTypeSubjectContainerCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeName', function() {
		
		it('assigns string', function() {
			deepEqual(mainModule.LCHTypeSubjectContainerCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

	context('LCHRecipeCallback', function() {
		
		it('assigns function', function() {
			deepEqual(typeof mainModule.LCHTypeSubjectContainerCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

	context('LCHRecipeOutputType', function() {
		
		it('assigns string', function() {
			deepEqual(mainModule.LCHTypeSubjectContainerCanonicalExampleCallback().LCHRecipeOutputType, 'SubjectContainer');
		});

	});

});

describe('LCHTypeSubjectContainerRecipe', function testLCHTypeSubjectContainerRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeSubjectContainerRecipe(), {
			LCHRecipeName: 'Subject Container',
			LCHRecipeCallback: mainModule.LCHTypeSubjectContainerCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHTypeSubjectContainerCanonicalExampleCallback,
			LCHRecipeSignature: 'SubjectContainer',
		});
	});

});
