const { throws, deepEqual } = require('assert');

const mainModule = require('./_aggregate.js');

describe('LCHVitrineRecipes', function test_LCHVitrineRecipes() {

	it('returns LCHRecipe for each folder', function() {
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
