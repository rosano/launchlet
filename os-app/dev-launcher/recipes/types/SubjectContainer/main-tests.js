const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHTypeSubjectContainerCallback', function test_LCHTypeSubjectContainerCallback() {

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mod.LCHTypeSubjectContainerCallback(Object.assign(mod.LCHTypeSubjectContainerCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if LCHRecipeOutputType not valid', function() {
		deepEqual(mod.LCHTypeSubjectContainerCallback(Object.assign(mod.LCHTypeSubjectContainerCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHTypeSubjectContainerCallback(mod.LCHTypeSubjectContainerCanonicalExampleCallback()), true);
	});

});

describe('LCHTypeSubjectContainerCanonicalExampleCallback', function test_LCHTypeSubjectContainerCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mod.LCHTypeSubjectContainerCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeName', function() {
		
		it('assigns string', function() {
			deepEqual(mod.LCHTypeSubjectContainerCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

	context('LCHRecipeCallback', function() {
		
		it('assigns function', function() {
			deepEqual(typeof mod.LCHTypeSubjectContainerCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});

	});

	context('LCHRecipeOutputType', function() {
		
		it('assigns string', function() {
			deepEqual(mod.LCHTypeSubjectContainerCanonicalExampleCallback().LCHRecipeOutputType, 'SubjectContainer');
		});

	});

});

describe('LCHTypeSubjectContainerRecipe', function test_LCHTypeSubjectContainerRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHTypeSubjectContainerRecipe(), {
			LCHRecipeCallback: mod.LCHTypeSubjectContainerCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHTypeSubjectContainerCanonicalExampleCallback,
			LCHRecipeSignature: 'SubjectContainer',
			_LCHRecipeTypeIsExclusive: true,
		});
	});

});
