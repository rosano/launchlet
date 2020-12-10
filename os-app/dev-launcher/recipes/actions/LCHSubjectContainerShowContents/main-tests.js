const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHSubjectContainerShowContentsCallback', function test_LCHSubjectContainerShowContentsCallback(inputData) {

	it('returns inputData', function() {
		const item = function () {};
		deepEqual(mod.LCHSubjectContainerShowContentsCallback(item), item);
	});

});

describe('LCHSubjectContainerShowContentsRecipe', function test_LCHSubjectContainerShowContentsRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mod.LCHSubjectContainerShowContentsRecipe(), {
			LCHRecipeSignature: 'LCHSubjectContainerShowContents',
			LCHRecipeInputTypes: 'SubjectContainer',
			LCHRecipeCallback: mod.LCHSubjectContainerShowContentsCallback,
		});
	});

});
