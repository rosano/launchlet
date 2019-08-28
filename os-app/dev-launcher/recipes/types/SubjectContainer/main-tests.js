import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('SubjectContainerCallback', function testSubjectContainerCallback() {

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.SubjectContainerCallback(Object.assign(mainModule.SubjectContainerCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if LCHRecipeOutputType not valid', function() {
		deepEqual(mainModule.SubjectContainerCallback(Object.assign(mainModule.SubjectContainerCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.SubjectContainerCallback(mainModule.SubjectContainerCanonicalExampleCallback()), true);
	});

});

describe('SubjectContainerCanonicalExampleCallback', function testSubjectContainerCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mainModule.SubjectContainerCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeName', function() {
		
		it('assigns string', function() {
			deepEqual(mainModule.SubjectContainerCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

	context('LCHRecipeCallback', function() {
		
		it('assigns function', function() {
			deepEqual(typeof mainModule.SubjectContainerCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

	context('LCHRecipeOutputType', function() {
		
		it('assigns string', function() {
			deepEqual(mainModule.SubjectContainerCanonicalExampleCallback().LCHRecipeOutputType, '[Subject]');
		});

	});

});

describe('SubjectContainerRecipe', function testSubjectContainerRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.SubjectContainerRecipe(), {
			LCHRecipeName: 'Subject Container',
			LCHRecipeCallback: mainModule.SubjectContainerCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.SubjectContainerCanonicalExampleCallback,
			LCHRecipeSignature: 'SubjectContainer',
		});
	});

});
