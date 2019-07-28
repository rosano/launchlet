import { throws, deepEqual } from 'assert';

import * as mainModule from './api.js';

const kTesting = {
	StubRecipeObjectValid: function() {
		return {
			callback () {},
		};
	},
};

describe('LCHRecipesModelErrorsFor', function testLCHRecipesModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHRecipesModelErrorsFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object if callback not function', function() {
		deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
			callback: null,
		})), {
			callback: [
				'LCHErrorNotFunction',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHRecipesModelErrorsFor(kTesting.StubRecipeObjectValid()), null);
	});

	context('name', function() {

		it('returns object if name not string', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				name: null,
			})), {
				name: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns object if name contains untrimmed whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				name: ' alfa',
			})), {
				name: [
					'LCHErrorNotTrimmed',
				],
			});
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				name: 'alfa ',
			})), {
				name: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				name: 'alfa',
			})), null);
		});

	});

	context('signature', function() {

		it('returns object if signature not string', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				signature: null,
			})), {
				signature: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				signature: 'alfa',
			})), null);
		});

	});

});

