import { throws, deepEqual } from 'assert';

import * as mainModule from './recipes.js';

describe('LCHLauncherStandardRecipes', function testLCHLauncherStandardRecipes() {

	it('returns LCHFormulaObject for each folder', function() {
		deepEqual(mainModule.LCHLauncherStandardRecipes(), [].concat.apply([], require('glob').sync('*main.js', {
		  matchBase: true,
		  cwd: __dirname,
		}).map(function (e) {
			return Object.entries(require(`./${ e }`)).map(function (e) {
				return {
					LCHRecipeSignature: e.shift(),
					LCHRecipeCallback: e.pop(),
				};
			});
		})));
	});

});
