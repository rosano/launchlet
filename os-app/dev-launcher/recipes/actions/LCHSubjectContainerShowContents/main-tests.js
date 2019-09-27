import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHSubjectContainerShowContentsCallback', function testLCHSubjectContainerShowContentsCallback(inputData) {

	it('returns inputData', function() {
		const item = function () {};
		deepEqual(mainModule.LCHSubjectContainerShowContentsCallback(item), item);
	});

});

describe('LCHSubjectContainerShowContentsRecipe', function testLCHSubjectContainerShowContentsRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHSubjectContainerShowContentsRecipe(), {
			LCHRecipeSignature: 'LCHSubjectContainerShowContents',
			LCHRecipeInputTypes: 'SubjectContainer',
			LCHRecipeCallback: mainModule.LCHSubjectContainerShowContentsCallback,
		});
	});

});
