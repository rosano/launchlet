const { throws, deepEqual } = require('assert');

const mod = require('./recipes.js').default;

describe('LCHVitrinePageColoursRandomizeRecipe', function test_LCHVitrinePageColoursRandomizeRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHVitrinePageColoursRandomizeRecipe(), {
			LCHRecipeCallback: mod.LCHVitrinePageColoursRandomizeCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
		});
	});

});

describe('LCHVitrinePageColoursRestoreRecipe', function test_LCHVitrinePageColoursRestoreRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHVitrinePageColoursRestoreRecipe(), {
			LCHRecipeCallback: mod.LCHVitrinePageColoursRestoreCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRestore',
			LCHRecipeIsExcluded: mod.LCHVitrinePageColoursRestoreIsHidden,
		});
	});

});

describe('LCHVitrineCopyPageInfoRecipe', function test_LCHVitrineCopyPageInfoRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHVitrineCopyPageInfoRecipe(), {
			LCHRecipeCallback: mod.LCHVitrineCopyPageInfoCallback,
			LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
		});
	});

});

describe('LCHVitrineSendEmailRecipe', function test_LCHVitrineSendEmailRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mod.LCHVitrineSendEmailRecipe(), {
			LCHRecipeCallback: mod.LCHVitrineSendEmailCallback,
			LCHRecipeSignature: 'LCHVitrineSendEmail',
		});
	});

});

describe('LCHVitrinePageLinksHighlightAddRecipe', function test_LCHVitrinePageLinksHighlightAddRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mod.LCHVitrinePageLinksHighlightAddRecipe(), {
			LCHRecipeCallback: mod.LCHVitrinePageLinksHighlightAddCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
			LCHRecipeIsExcluded: mod.LCHVitrinePageLinksHighlightAddIsHidden,
		});
	});

});

describe('LCHVitrinePageLinksHighlightRemoveRecipe', function test_LCHVitrinePageLinksHighlightRemoveRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mod.LCHVitrinePageLinksHighlightRemoveRecipe(), {
			LCHRecipeCallback: mod.LCHVitrinePageLinksHighlightRemoveCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightRemove',
			LCHRecipeIsExcluded: mod.LCHVitrinePageLinksHighlightRemoveIsHidden,
		});
	});

});

describe('LCHVitrineMinimalistDateStringCallback', function test_LCHVitrineMinimalistDateStringCallback() {

	it('returns string', function() {
		deepEqual(mod.LCHVitrineMinimalistDateStringCallback(), (new Date()).toJSON().slice(0, 10).replace(/-/g, '.'));
	});

});

describe('LCHVitrineMinimalistDateStringRecipe', function test_LCHVitrineMinimalistDateStringRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHVitrineMinimalistDateStringRecipe(), {
			LCHRecipeCallback: mod.LCHVitrineMinimalistDateStringCallback,
			LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
			LCHRecipeOutputType: 'String',
		});
	});

});
