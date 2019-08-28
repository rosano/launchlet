import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

const uSort = function (inputData) {
	return inputData.map(function (e) {
		return Object.assign(e, {
			_TestSortKey: e.LCHRecipeSignature.indexOf('LCH') === -1 ? `Type${ e.LCHRecipeSignature }` : e.LCHRecipeSignature,
		});
	}).sort(function (a, b) {
		if ( a._TestSortKey < b._TestSortKey) {
			return -1;
		}
		if ( a._TestSortKey > b._TestSortKey) {
			return 1;
		}
		
		return 0;
	}).map(function (e) {
		delete e._TestSortKey;
		
		return e;
	});
};

describe('LCHLauncherStandardRecipes', function testLCHLauncherStandardRecipes() {

	it('returns LCHFormulaObject for each folder', function() {
		deepEqual(uSort(mainModule.LCHLauncherStandardRecipes()), uSort([].concat.apply([], require('glob').sync('*main.js', {
		  matchBase: true,
		  cwd: __dirname,
		}).map(function (e) {
			return Object.entries(require(`./${ e }`)).filter(function (e) {
				return e.shift().includes('Recipe');
			}).map(function (e) {
				return e.pop()();
			});
		}))));
	});

});
