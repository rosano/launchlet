const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHPrimitiveServiceSearchURLTemplateCallback', function test_LCHPrimitiveServiceSearchURLTemplateCallback() {

	it('returns false if not URL', function() {
		deepEqual(mod.LCHPrimitiveServiceSearchURLTemplateCallback('://example'), false);
	});

	it('returns false if no token match', function() {
		deepEqual(mod.LCHPrimitiveServiceSearchURLTemplateCallback('https://example.com?q=LCHSEARCHTOKE'), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHPrimitiveServiceSearchURLTemplateCallback('https://example.com?q=LCHSEARCHTOKEN1'), true);
	});

	it('matches lowercase', function() {
		deepEqual(mod.LCHPrimitiveServiceSearchURLTemplateCallback('https://example.com?q=lchsearchtoken'), true);
	});

});

describe('LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback', function test_LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mod.LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback(), 'https://example.com?q=LCHSEARCHTOKEN');
	});

});

describe('LCHPrimitiveServiceSearchURLTemplateRecipe', function test_LCHPrimitiveServiceSearchURLTemplateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHPrimitiveServiceSearchURLTemplateRecipe(), {
			LCHRecipeSignature: 'ServiceSearchURLTemplate',
			LCHRecipeCallback: mod.LCHPrimitiveServiceSearchURLTemplateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mod.LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback,
			_LCHRecipeTypeIsExclusive: true,
		});
	});

});
