import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHSubjectContainerShowContentsCallback', function testLCHSubjectContainerShowContentsCallback() {

});

describe('LCHSubjectContainerShowContentsRecipe', function testLCHSubjectContainerShowContentsRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHSubjectContainerShowContentsRecipe(), {
			LCHRecipeName: 'Show Contents',
			LCHRecipeSignature: 'LCHSubjectContainerShowContents',
			LCHRecipeInputTypes: 'SubjectContainer',
			LCHRecipeCallback: mainModule.LCHSubjectContainerShowContentsCallback,
		});
	});

});
