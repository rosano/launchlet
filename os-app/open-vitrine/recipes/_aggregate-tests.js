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

describe('LCHVitrineCopyPageInfoRecipe', function test_LCHVitrineCopyPageInfoRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHVitrineCopyPageInfoRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineCopyPageInfo,
			LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
		});
	});

});

describe('LCHVitrineMinimalistDateStringRecipe', function test_LCHVitrineMinimalistDateStringRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateStringRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineMinimalistDateString,
			LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
			LCHRecipeOutputType: 'String',
		});
	});

});

describe('LCHVitrineMinimalistDateString', function test_LCHVitrineMinimalistDateString() {

	it('returns string', async function() {
		deepEqual(mainModule.LCHVitrineMinimalistDateString(), (new Date()).toJSON().slice(0, 10).replace(/-/g, '.'));
	});

});
