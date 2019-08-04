import { throws, deepEqual } from 'assert';

import * as mainModule from './api.js';

const kTesting = {
	StubRecipeObjectValid() {
		return {
			LCHRecipeCallback () {},
		};
	},
	StubComponentDescriptorObjectValid() {
		return {
			LCHComponentDescriptorName: 'alfa',
			LCHComponentDescriptorCompletionHandler: 'bravo',
		};
	},
	StubRecipeObjectType() {
		return Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeSignature: 'alfa',
			LCHRecipeCallback (inputData) {
				return typeof inputData.bravo === 'string';
			},
			LCHRecipeOutputType: 'Bool',
			LCHRecipeOutputTypeCanonicalExampleCallback () {
				return {
					bravo: 'charlie',
				};
			},
		});
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
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputType: null,
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns object if not filled', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputType: '',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if not trimmed', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputType: ' alfa ',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputType: ' ',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputType: 'alfa',
			})), null);
		});

		it('returns object if Bool and no LCHRecipeOutputTypeCanonicalExampleCallback', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputTypeCanonicalExampleCallback: undefined,
			})), {
				LCHRecipeOutputTypeCanonicalExampleCallback: [
					'LCHErrorNotPresent',
				],
			});
		});

		it('returns object if Bool and no LCHRecipeSignature', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeSignature: undefined,
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotPresent',
				],
			});
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

describe('LCHAPITypeEquivalenceMapForRecipes', function testLCHAPITypeEquivalenceMapForRecipes() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule.LCHAPITypeEquivalenceMapForRecipes(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHAPITypeEquivalenceMapForRecipes([]), 'object');
	});

	it('excludes if no LCHRecipeOutputType', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputType: undefined,
			})]), {});
	});

	it('excludes if not valid', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputTypeCanonicalExampleCallback: undefined,
			})]), {});
	});

	it('excludes if LCHRecipeOutputType not bool', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeOutputType: 'alfa',
			})]), {});
	});

	it('excludes if LCHRecipeOutputTypeCanonicalExampleCallback fails', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeOutputTypeCanonicalExampleCallback () {
				return {
					delta: 'charlie',
				};
			},
		})]), {});
	});

	it('creates map for single', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType()]), {
			alfa: ['alfa'],
		});
	});

	it('creates map for multiple', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'echo',
		})]), {
			alfa: ['alfa', 'echo'],
			echo: ['alfa', 'echo'],
		});
	});

	it('maps if equivalent', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'echo',
		})]), {
			alfa: ['alfa', 'echo'],
			echo: ['alfa', 'echo'],
		});
	});

	it('maps if not equivalent', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([
			kTesting.StubRecipeObjectType(),
			Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeSignature: 'echo',
				LCHRecipeCallback (inputData) {
					return typeof inputData.foxtrot === 'string';
				},
				LCHRecipeOutputTypeCanonicalExampleCallback () {
					return {
						foxtrot: 'golf',
					};
				},
			}),
			]), {
			alfa: ['alfa'],
			echo: ['echo'],
		});
	});

	it('excludes if duplicate', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([
			Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeCallback (inputData) {
					return typeof inputData.foxtrot === 'string';
				},
				LCHRecipeOutputTypeCanonicalExampleCallback () {
					return {
						foxtrot: 'charlie',
					};
				},
			}),
			kTesting.StubRecipeObjectType(),
			Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeSignature: 'echo',
				LCHRecipeCallback (inputData) {
					return typeof inputData.foxtrot === 'string';
				},
				LCHRecipeOutputTypeCanonicalExampleCallback () {
					return {
						foxtrot: 'golf',
					};
				},
			}),
			]), {
			alfa: ['alfa', 'echo'],
			echo: ['alfa', 'echo'],
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
