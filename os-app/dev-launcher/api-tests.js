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

describe('LCHAPIObjectFor', function testLCHAPIObjectFor() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule.LCHAPIObjectFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHAPIObjectFor([]), 'object');
	});

	context('fn', function() {

		it('throws error if not string', function() {
			throws(function() {
				mainModule.LCHAPIObjectFor([]).fn(null);
			}, /LCHErrorIdentifierNotString/);
		});

		it('throws error if blank', function() {
			throws(function() {
				mainModule.LCHAPIObjectFor([]).fn('');
			}, /LCHErrorIdentifierBlank/);
		});

		it('throws error if contains untrimmed whitespace', function() {
			throws(function() {
				mainModule.LCHAPIObjectFor([]).fn(' alfa');
			}, /LCHErrorIdentifierContainsUntrimmedWhitespace/);
			throws(function() {
				mainModule.LCHAPIObjectFor([]).fn('alfa ');
			}, /LCHErrorIdentifierContainsUntrimmedWhitespace/);
		});

		it('throws error if not defined', function() {
			throws(function() {
				mainModule.LCHAPIObjectFor([]).fn('alfa');
			}, /LCHErrorIdentifierNotDefined/);
		});

		it('returns callback output', function() {
			deepEqual(mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
				callback() {
					return 'bravo';
				},
				signature: 'alfa',
			})]).fn('alfa')(), 'bravo');
		});

		it('populates this.api.fn', function() {
			deepEqual(mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
				callback(inputData) {
					return `hello ${ inputData }`;
				},
				signature: 'alfa',
			}), Object.assign(kTesting.StubRecipeObjectValid(), {
				callback() {
					return this.api.fn('alfa')('bravo');
				},
				signature: 'charlie',
			})]).fn('charlie')(), 'hello bravo');
		});

	});

});
