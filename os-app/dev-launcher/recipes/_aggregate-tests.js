const { throws, deepEqual } = require('assert');

const mod = require('./_aggregate.js');

describe('LCHLauncherStandardRecipes', function test_LCHLauncherStandardRecipes() {

	it('returns LCHRecipe for each folder', function() {
		const item = [].concat.apply([], require('glob').globSync('*/**/main.js', {
		  matchBase: true,
		  cwd: __dirname,
		}).map(function (e) {
			return Object.entries(require(`./${ e }`)).filter(function (e) {
				return e.shift().includes('Recipe');
			}).map(function (e) {
				return e.pop()();
			});
		}));

		deepEqual(item.filter(function (e) {
			return !mod.LCHLauncherStandardRecipes().filter(function (e2) {
				return e2.LCHRecipeCallback === e.LCHRecipeCallback;
			}).length;
		}), []);
	});

});
