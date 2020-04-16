const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHSubjectContainerShowContentsCallback', function test_LCHSubjectContainerShowContentsCallback(inputData) {

	it('returns inputData', function() {
		const item = function () {};
		deepEqual(mainModule.LCHSubjectContainerShowContentsCallback(item), item);
	});

});

describe('LCHSubjectContainerShowContentsRecipe', function test_LCHSubjectContainerShowContentsRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHSubjectContainerShowContentsRecipe(), {
			LCHRecipeSignature: 'LCHSubjectContainerShowContents',
			LCHRecipeInputTypes: 'SubjectContainer',
			LCHRecipeCallback: mainModule.LCHSubjectContainerShowContentsCallback,
		});
	});

});
