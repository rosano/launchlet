import { throws, deepEqual } from 'assert';

import * as mainModule from './api.js';

const kTesting = {
	StubRecipeObjectValid: function() {
		return {
			LCHRecipeCallback () {},
		};
	},
	StubComponentDescriptorObjectValid: function() {
		return {
			LCHComponentDescriptorName: 'alfa',
			LCHComponentDescriptorCompletionHandler: 'bravo',
		};
	},
};

describe('LCHRecipesModelErrorsFor', function testLCHRecipesModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHRecipesModelErrorsFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object if LCHRecipeCallback not function', function() {
		deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback: null,
		})), {
			LCHRecipeCallback: [
				'LCHErrorNotFunction',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHRecipesModelErrorsFor(kTesting.StubRecipeObjectValid()), null);
	});

	context('LCHRecipeTitle', function() {

		it('returns object if LCHRecipeTitle not string', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeTitle: null,
			})), {
				LCHRecipeTitle: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns object if LCHRecipeTitle not filled', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeTitle: '',
			})), {
				LCHRecipeTitle: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if LCHRecipeTitle contains untrimmed whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeTitle: ' alfa',
			})), {
				LCHRecipeTitle: [
					'LCHErrorNotTrimmed',
				],
			});
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeTitle: 'alfa ',
			})), {
				LCHRecipeTitle: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeTitle: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeSignature', function() {

		it('returns object if LCHRecipeSignature not string', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: null,
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeOutputType', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: null,
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns object if not filled', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: '',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if not trimmed', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: ' alfa ',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: ' ',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeOutputTypeCanonicalExampleCallback', function() {

		it('returns object if LCHRecipeOutputTypeCanonicalExampleCallback not function', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputTypeCanonicalExampleCallback: null,
			})), {
				LCHRecipeOutputTypeCanonicalExampleCallback: [
					'LCHErrorNotFunction',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputTypeCanonicalExampleCallback () {},
			})), null);
		});

	});

	context('LCHRecipeURLFilter', function() {

		it('returns object if LCHRecipeURLFilter not string', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeURLFilter: null,
			})), {
				LCHRecipeURLFilter: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeURLFilter: 'alfa',
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

		it('returns LCHRecipeCallback output', function() {
			deepEqual(mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCallback() {
					return 'bravo';
				},
				LCHRecipeSignature: 'alfa',
			})]).fn('alfa')(), 'bravo');
		});

		it('populates this.api.fn', function() {
			deepEqual(mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}), Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCallback() {
					return this.api.fn('alfa')('bravo');
				},
				LCHRecipeSignature: 'charlie',
			})]).fn('charlie')(), 'hello bravo');
		});

	});

});

describe('LCHComponentDescriptorsModelErrorsFor', function testLCHComponentDescriptorsModelErrorsFor() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHComponentDescriptorsModelErrorsFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object if LCHComponentDescriptorName not string', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: null,
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHComponentDescriptorName empty', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: '',
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHComponentDescriptorName contains untrimmed whitespace', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: ' alfa',
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotTrimmed',
			],
		});
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: 'alfa ',
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotTrimmed',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandler not string', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandler: null,
		})), {
			LCHComponentDescriptorCompletionHandler: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandler empty', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandler: '',
		})), {
			LCHComponentDescriptorCompletionHandler: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandler contains untrimmed whitespace', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandler: ' alfa',
		})), {
			LCHComponentDescriptorCompletionHandler: [
				'LCHErrorNotTrimmed',
			],
		});
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandler: 'alfa ',
		})), {
			LCHComponentDescriptorCompletionHandler: [
				'LCHErrorNotTrimmed',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(kTesting.StubComponentDescriptorObjectValid()), null);
	});

	context('LCHComponentDescriptorProps', function() {

		it('returns object if LCHComponentDescriptorProps not object', function() {
			deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
				LCHComponentDescriptorProps: null,
			})), {
				LCHComponentDescriptorProps: [
					'LCHErrorNotObject',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
				LCHComponentDescriptorProps: {},
			})), null);
		});

	});

});
