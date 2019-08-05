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
	StubRecipeObjectCommand() {
		return Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeTitle: 'alfa',
		});
	},
	StubRecipeObjectSubject() {
		return Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeTitle: 'alfa',
			LCHRecipeOutputType: 'bravo',
		});
	},
	StubRecipeObjectVerb() {
		return Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeTitle: 'alfa',
			LCHRecipeInputTypes: 'bravo, charlie',
			LCHRecipeCallback (delta, bravo) {},
		});
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

	context('LCHRecipeInputTypes', function() {

		it('returns object if not string', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeInputTypes: null,
			})), {
				LCHRecipeInputTypes: [
					'LCHErrorNotString',
				],
			});
		});

		it('returns object if not filled', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeInputTypes: '',
			})), {
				LCHRecipeInputTypes: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeInputTypes: ' ',
			})), {
				LCHRecipeInputTypes: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeInputTypes: 'alfa',
			})), null);
		});

		it('allows comma', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeInputTypes: 'alfa,bravo',
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

describe('LCHRecipesModelIsCommand', function testLCHRecipesModelIsCommand() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsCommand({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeTitle', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeTitle: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(kTesting.StubRecipeObjectCommand()), true);
	});

});

describe('LCHRecipesModelIsSubject', function testLCHRecipesModelIsSubject() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsSubject({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeTitle', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeTitle: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns false if no LCHRecipeOutputType', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeOutputType: undefined,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(kTesting.StubRecipeObjectSubject()), true);
	});

});

describe('LCHRecipesModelIsVerb', function testLCHRecipesModelIsVerb() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsVerb({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeTitle', function() {
		deepEqual(mainModule.LCHRecipesModelIsVerb(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeTitle: undefined,
		})), false);
	});

	it('returns false if no arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsVerb(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeCallback () {},
		})), false);
	});

	it('returns false if no LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelIsVerb(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeInputTypes: undefined,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsVerb(kTesting.StubRecipeObjectVerb()), true);
	});

});

describe('LCHRecipesModelIsType', function testLCHRecipesModelIsType() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsType({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeSignature', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeSignature: undefined,
		})), false);
	});

	it('returns false if no arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeCallback () {},
		})), false);
	});

	it('returns false if more than one argument', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeCallback (alfa, bravo) {},
		})), false);
	});

	it('returns false if LCHRecipeOutputType not Bool', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(kTesting.StubRecipeObjectType()), true);
	});

});

describe('LCHRecipesModelVerbTakesObject', function testLCHRecipesModelVerbTakesObject() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelVerbTakesObject({});
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if not Verb', function() {
		throws(function() {
			mainModule.LCHRecipesModelVerbTakesObject(Object.assign(kTesting.StubRecipeObjectVerb(), {
				LCHRecipeTitle: undefined,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if less than two LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesObject(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeInputTypes: 'alfa',
		})), false);
	});

	it('returns false if less than two arguments', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesObject(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesObject(kTesting.StubRecipeObjectVerb()), true);
	});

});

describe('LCHRecipesModelVerbTakesParams', function testLCHRecipesModelVerbTakesParams() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelVerbTakesParams({});
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if not Verb', function() {
		throws(function() {
			mainModule.LCHRecipesModelVerbTakesParams(Object.assign(kTesting.StubRecipeObjectVerb(), {
				LCHRecipeTitle: undefined,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if last LCHRecipeInputTypes not Object', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesParams(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeInputTypes: 'alfa, bravo, charlie',
		})), false);
	});

	it('returns false if arguments count not match LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesParams(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeCallback (alfa, bravo, charlie) {},
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesParams(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeInputTypes: 'alfa, bravo, Object',
			LCHRecipeCallback (charlie, delta, echo) {},
		})), true);
	});

	it('accepts two arguments', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesParams(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeInputTypes: 'alfa, Object',
			LCHRecipeCallback (charlie, echo) {},
		})), true);
	});

	it('accepts one argument', function() {
		deepEqual(mainModule.LCHRecipesModelVerbTakesParams(Object.assign(kTesting.StubRecipeObjectVerb(), {
			LCHRecipeInputTypes: 'Object',
			LCHRecipeCallback (echo) {},
		})), true);
	});

});

describe('LCHRecipeInputTypesForString', function testLCHRecipeInputTypesForString() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHRecipeInputTypesForString(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHRecipeInputTypesForString(''), []);
	});

	it('excludes if blank', function() {
		deepEqual(mainModule.LCHRecipeInputTypesForString(','), []);
	});

	it('includes if single', function() {
		deepEqual(mainModule.LCHRecipeInputTypesForString('alfa'), ['alfa']);
	});

	it('includes if multiple', function() {
		deepEqual(mainModule.LCHRecipeInputTypesForString('alfa,bravo'), ['alfa', 'bravo']);
	});

	it('trims whitespace', function() {
		deepEqual(mainModule.LCHRecipeInputTypesForString('alfa , bravo'), ['alfa', 'bravo']);
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

	it('excludes if not type', function() {
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

describe('LCHAPIVerbsForType', function testLCHAPIVerbsForType() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHAPIVerbsForType(null, []);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not array', function() {
		throws(function() {
			mainModule.LCHAPIVerbsForType('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHAPIVerbsForType('', []), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mainModule.LCHAPIVerbsForType('', [Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback: undefined,
		})]), []);
	});

	it('excludes if not Verb', function() {
		deepEqual(mainModule.LCHAPIVerbsForType('', [kTesting.StubRecipeObjectValid()]), []);
	});

	it('excludes if LCHRecipeInputTypes not match', function() {
		deepEqual(mainModule.LCHAPIVerbsForType('alfa', [kTesting.StubRecipeObjectVerb()]), []);
	});

	it('excludes if LCHRecipeInputTypes match second param', function() {
		deepEqual(mainModule.LCHAPIVerbsForType('charlie', [kTesting.StubRecipeObjectVerb()]), []);
	});

	it('includes if LCHRecipeInputTypes match first param', function() {
		let item = kTesting.StubRecipeObjectVerb();
		deepEqual(mainModule.LCHAPIVerbsForType('bravo', [item]), [item]);
	});

});

describe('LCHAPISubjectsForType', function testLCHAPISubjectsForType() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHAPISubjectsForType(null, []);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not array', function() {
		throws(function() {
			mainModule.LCHAPISubjectsForType('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHAPISubjectsForType('', []), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mainModule.LCHAPISubjectsForType('', [Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback: undefined,
		})]), []);
	});

	it('excludes if not Subject', function() {
		deepEqual(mainModule.LCHAPISubjectsForType('', [kTesting.StubRecipeObjectValid()]), []);
	});

	it('excludes if LCHRecipeOutputType not match', function() {
		deepEqual(mainModule.LCHAPISubjectsForType('alfa', [kTesting.StubRecipeObjectSubject()]), []);
	});

	it('includes if LCHRecipeOutputType match', function() {
		let item = kTesting.StubRecipeObjectSubject();
		deepEqual(mainModule.LCHAPISubjectsForType('bravo', [item]), [item]);
	});

});

describe('_LCHIntersect', function test_LCHIntersect() {

	it('returns array', function() {
		deepEqual([]._LCHIntersect(), []);
	});

	it('excludes if not array', function() {
		deepEqual(['alfa']._LCHIntersect(), []);
	});

	it('includes if single', function() {
		deepEqual([['alfa', 'bravo']]._LCHIntersect(), ['alfa', 'bravo']);
	});

	it('excludes if no match', function() {
		deepEqual([['alfa'], ['bravo']]._LCHIntersect(), []);
	});

	it('includes if match', function() {
		deepEqual([['alfa'], ['alfa']]._LCHIntersect(), ['alfa']);
	});

	it('includes if match duplicate', function() {
		deepEqual([['alfa'], ['alfa', 'alfa']]._LCHIntersect(), ['alfa']);
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
