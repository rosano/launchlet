import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHLauncherStandardRecipes', function testLCHLauncherStandardRecipes() {

	it('returns LCHFormulaObject for each folder', function() {
		const items = [].concat.apply([], require('glob').sync('*/**/main.js', {
		  matchBase: true,
		  cwd: __dirname,
		}).map(function (e) {
			return Object.entries(require(`./${ e }`)).filter(function (e) {
				return e.shift().includes('Recipe');
			}).map(function (e) {
				return e.pop()();
			});
		}));

		deepEqual(mainModule.LCHLauncherStandardRecipes().filter(function (e) {
			return !items.filter(function (e2) {
				return e2.LCHRecipeCallback === e.LCHRecipeCallback;
			}).length;
		}), []);
	});

});
