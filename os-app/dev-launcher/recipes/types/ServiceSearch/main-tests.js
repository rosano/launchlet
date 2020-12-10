const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHTypeServiceSearchCallback', function test_LCHTypeServiceSearchCallback() {

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mod.LCHTypeServiceSearchCallback(Object.assign(mod.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mod.LCHTypeServiceSearchCallback(Object.assign(mod.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns false if LCHRecipeOutputType not ServiceSearchURLTemplate', function() {
		deepEqual(mod.LCHTypeServiceSearchCallback(Object.assign(mod.LCHTypeServiceSearchCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHTypeServiceSearchCallback(mod.LCHTypeServiceSearchCanonicalExampleCallback()), true);
	});

});

describe('LCHTypeServiceSearchCanonicalExampleCallback', function test_LCHTypeServiceSearchCanonicalExampleCallback() {

	it('returns object', function() {
		deepEqual(typeof mod.LCHTypeServiceSearchCanonicalExampleCallback(), 'object');
	});

	context('LCHRecipeName', function() {
		
		it('assigns string', function() {
			deepEqual(mod.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeName, 'alfa');
		});

	});

	context('LCHRecipeCallback', function() {
		
		it('assigns function', function() {
			deepEqual(typeof mod.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeCallback, 'function');
		});
		
		it('returns string', function() {
			deepEqual(mod.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeCallback(), 'http://example.com?q=LCHSEARCHTOKEN');
		});

	});

	context('LCHRecipeOutputType', function() {
		
		it('assigns string', function() {
			deepEqual(mod.LCHTypeServiceSearchCanonicalExampleCallback().LCHRecipeOutputType, 'ServiceSearchURLTemplate');
		});

	});

});

describe('LCHTypeServiceSearchRecipe', function test_LCHTypeServiceSearchRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHTypeServiceSearchRecipe(), {
			LCHRecipeCallback: mod.LCHTypeServiceSearchCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHTypeServiceSearchCanonicalExampleCallback,
			LCHRecipeSignature: 'ServiceSearch',
		});
	});

});
