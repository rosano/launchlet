const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHPrimitiveServiceSearchURLTemplateCallback', function test_LCHPrimitiveServiceSearchURLTemplateCallback() {

	it('returns false if not URL', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('://example'), false);
	});

	it('returns false if no token match', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKE'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=LCHSEARCHTOKEN1'), true);
	});

	it('matches lowercase', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCallback('http://example.com?q=lchsearchtoken'), true);
	});

});

describe('LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback', function test_LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback(), 'http://example.com?q=LCHSEARCHTOKEN');
	});

});

describe('LCHPrimitiveServiceSearchURLTemplateRecipe', function test_LCHPrimitiveServiceSearchURLTemplateRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHPrimitiveServiceSearchURLTemplateRecipe(), {
			LCHRecipeSignature: 'ServiceSearchURLTemplate',
			LCHRecipeCallback: mainModule.LCHPrimitiveServiceSearchURLTemplateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: mainModule.LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback,
			_LCHRecipeTypeIsExclusive: true,
		});
	});

});
