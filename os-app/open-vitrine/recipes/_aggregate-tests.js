const { throws, deepEqual } = require('assert');

const mainModule = require('./_aggregate.js').default;

describe('LCHVitrineRecipes', function test_LCHVitrineRecipes() {

	it.skip('returns LCHRecipe for each folder', function() {
		const items = [].concat.apply([], require('glob').sync('**/main.js', {
		  matchBase: true,
		  cwd: __dirname,
		}).map(function (e) {
			return Object.entries(require(`./${ e }`)).filter(function (e) {
				return e.shift().includes('Recipe');
			}).map(function (e) {
				return e.pop()();
			});
		}));

		deepEqual(items.filter(function (e) {
			return !mainModule.LCHVitrineRecipes().filter(function (e2) {
				return e2.LCHRecipeCallback === e.LCHRecipeCallback;
			}).length;
		}), []);
	});

});

describe('LCHVitrinePageColoursRandomizeRecipe', function test_LCHVitrinePageColoursRandomizeRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHVitrinePageColoursRandomizeRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageColoursRandomizeCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
		});
	});

});

describe('LCHVitrinePageColoursRestoreRecipe', function test_LCHVitrinePageColoursRestoreRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHVitrinePageColoursRestoreRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageColoursRestoreCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRestore',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageColoursRestoreIsHidden,
		});
	});

});

describe('LCHVitrineCopyPageInfoRecipe', function test_LCHVitrineCopyPageInfoRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHVitrineCopyPageInfoRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineCopyPageInfoCallback,
			LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
		});
	});

});

describe('LCHVitrineSendEmailRecipe', function test_LCHVitrineSendEmailRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineSendEmailRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineSendEmailCallback,
			LCHRecipeSignature: 'LCHVitrineSendEmail',
		});
	});

});

describe('LCHVitrinePageLinksHighlightAddRecipe', function test_LCHVitrinePageLinksHighlightAddRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageLinksHighlightAddRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageLinksHighlightAddCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageLinksHighlightAddIsHidden,
		});
	});

});

describe('LCHVitrinePageLinksHighlightRemoveRecipe', function test_LCHVitrinePageLinksHighlightRemoveRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageLinksHighlightRemoveRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageLinksHighlightRemoveCallback,
			LCHRecipeSignature: 'LCHVitrinePageLinksHighlightRemove',
			LCHRecipeIsExcluded: mainModule.LCHVitrinePageLinksHighlightRemoveIsHidden,
		});
	});

});

describe('LCHVitrineMinimalistDateStringCallback', function test_LCHVitrineMinimalistDateStringCallback() {

	it('returns string', function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringCallback(), (new Date()).toJSON().slice(0, 10).replace(/-/g, '.'));
	});

});

describe('LCHVitrineMinimalistDateStringRecipe', function test_LCHVitrineMinimalistDateStringRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineMinimalistDateStringCallback,
			LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
			LCHRecipeOutputType: 'String',
		});
	});

});
