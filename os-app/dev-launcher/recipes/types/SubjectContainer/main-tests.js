const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHTypeSubjectContainerCallback', function test_LCHTypeSubjectContainerCallback() {

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

describe('LCHTypeSubjectContainerCanonicalExampleCallback', function test_LCHTypeSubjectContainerCanonicalExampleCallback() {

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

describe('LCHTypeSubjectContainerRecipe', function test_LCHTypeSubjectContainerRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeSubjectContainerRecipe(), {
			LCHRecipeCallback: mainModule.LCHTypeSubjectContainerCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHTypeSubjectContainerCanonicalExampleCallback,
			LCHRecipeSignature: 'SubjectContainer',
			_LCHRecipeTypeIsExclusive: true,
		});
	});

});
