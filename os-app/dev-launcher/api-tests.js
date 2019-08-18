import { throws, rejects, deepEqual } from 'assert';

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
			LCHRecipeName: 'alfa',
		});
	},
	StubRecipeObjectSubject() {
		return Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeName: 'alfa',
			LCHRecipeOutputType: 'bravo',
		});
	},
	StubRecipeObjectAction() {
		return Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeName: 'alfa',
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
	StubRecipeObjectTask() {
		return {
			LCHRecipeCallback () {},
			LCHRecipeURLFilter: 'alfa',
			LCHRecipeIsAutomatic: true,
		};
	},
	StubCompositionObjectValid() {
		return {
			LCHCompositionAction: kTesting.StubRecipeObjectAction(),
			LCHCompositionSubjectPrimary: kTesting.StubRecipeObjectSubject(),
		};
	},
	StubAPIObjectValid(hash) {
		return {
			fn (address) {
				return hash[address];
			},
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

	context('LCHRecipeName', function() {

		it('returns object if LCHRecipeName not filled', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: '',
			})), {
				LCHRecipeName: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if LCHRecipeName contains untrimmed whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: ' alfa',
			})), {
				LCHRecipeName: [
					'LCHErrorNotTrimmed',
				],
			});
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: 'alfa ',
			})), {
				LCHRecipeName: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeInputTypes', function() {

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

});

describe('LCHRecipesModelIsCommand', function testLCHRecipesModelIsCommand() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsCommand({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
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

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	// it('returns false if no LCHRecipeOutputType', function() {
	// 	deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
	// 		LCHRecipeOutputType: undefined,
	// 	})), false);
	// });

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(kTesting.StubRecipeObjectSubject()), true);
	});

});

describe('LCHRecipesModelIsAction', function testLCHRecipesModelIsAction() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsAction({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHRecipesModelIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if no arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeCallback () {},
		})), false);
	});

	it('returns false if no LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: undefined,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsAction(kTesting.StubRecipeObjectAction()), true);
	});

});

describe('LCHRecipesModelIsType', function testLCHRecipesModelIsType() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsType({});
		}, /LCHErrorInputInvalid/);
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

describe('LCHRecipesModelIsTask', function testLCHRecipesModelIsTask() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsTask({});
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsTask(Object.assign(kTesting.StubRecipeObjectTask(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns false if no LCHRecipeURLFilter', function() {
		deepEqual(mainModule.LCHRecipesModelIsTask(Object.assign(kTesting.StubRecipeObjectTask(), {
			LCHRecipeURLFilter: undefined,
		})), false);
	});

	it('returns false if LCHRecipeIsAutomatic not true', function() {
		deepEqual(mainModule.LCHRecipesModelIsTask(Object.assign(kTesting.StubRecipeObjectTask(), {
			LCHRecipeIsAutomatic: false,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsTask(kTesting.StubRecipeObjectTask()), true);
	});

});

import { LCHTypeServiceSearchRecipe } from './recipes/TypeServiceSearch/main.js';
describe('LCHLauncherConvertTypeServiceSearch', function testLCHLauncherConvertTypeServiceSearch() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule.LCHLauncherConvertTypeServiceSearch(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns inputData', function() {
		let item = Object.assign(LCHTypeServiceSearchRecipe().LCHRecipeOutputTypeCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		});
		deepEqual(mainModule.LCHLauncherConvertTypeServiceSearch([item]), [item]);
	});

	it('excludes if not object', function() {
		deepEqual(mainModule.LCHLauncherConvertTypeServiceSearch([null]), []);
	});

	context('TypeServiceSearch', function() {

		const item = mainModule.LCHLauncherConvertTypeServiceSearch([LCHTypeServiceSearchRecipe().LCHRecipeOutputTypeCanonicalExampleCallback()], function (inputData) {
			return `Search: ${ inputData }`;
		})[0];


		it('replaces with action', function() {
			deepEqual(mainModule.LCHRecipesModelIsAction(item), true);
		});

		it('contains only specified fields', function() {
			deepEqual(Object.keys(item), [
				'LCHRecipeName',
				'LCHRecipeInputTypes',
				'LCHRecipeCallback',
				'_LCHLauncherGenerated',
			]);
		});

		context('LCHRecipeName', function() {

			it('returns string', function() {
				deepEqual(item.LCHRecipeName, 'Search: alfa');
			});
			
		});

		context('LCHRecipeInputTypes', function() {

			it('returns string', function() {
				deepEqual(item.LCHRecipeInputTypes, 'String');
			});
			
		});

		context('LCHRecipeCallback', function() {

			it('returns function', function() {
				deepEqual(typeof item.LCHRecipeCallback, 'function');
			});

			it('has one argument', function() {
				deepEqual(item.LCHRecipeCallback.length, 1);
			});

			it('has calls api fn', function() {
				deepEqual(item.LCHRecipeCallback.bind({
					api: kTesting.StubAPIObjectValid({
						LCHSearchWith (param1, param2) {
							return [param1, param2.LCHRecipeCallback()];
						},
					})
				})('alfa'), ['alfa', 'http://example.com?q=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2']);
			});
			
		});

		context('_LCHLauncherGenerated', function() {

			it('returns boolean', function() {
				deepEqual(item._LCHLauncherGenerated, true);
			});
			
		});

	});

});

describe('LCHRecipesModelActionTakesObject', function testLCHRecipesModelActionTakesObject() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesObject({});
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if not Action', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeName: undefined,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if less than two LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa',
		})), false);
	});

	it('returns false if less than two arguments', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeCallback (alfa) {},
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesObject(kTesting.StubRecipeObjectAction()), true);
	});

});

describe('LCHRecipesModelActionTakesParams', function testLCHRecipesModelActionTakesParams() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesParams({});
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if not Action', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeName: undefined,
			}));
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if last LCHRecipeInputTypes not Object', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, bravo, charlie',
		})), false);
	});

	it('returns false if arguments count not match LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeCallback (alfa, bravo, charlie) {},
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, bravo, Object',
			LCHRecipeCallback (charlie, delta, echo) {},
		})), true);
	});

	it('accepts two arguments', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, Object',
			LCHRecipeCallback (charlie, echo) {},
		})), true);
	});

	it('accepts one argument', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
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

describe('LCHAPIActionsForType', function testLCHAPIActionsForType() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHAPIActionsForType(null, []);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not array', function() {
		throws(function() {
			mainModule.LCHAPIActionsForType('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHAPIActionsForType('', []), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mainModule.LCHAPIActionsForType('', [Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback: undefined,
		})]), []);
	});

	it('excludes if not Action', function() {
		deepEqual(mainModule.LCHAPIActionsForType('', [kTesting.StubRecipeObjectValid()]), []);
	});

	it('excludes if LCHRecipeInputTypes not match', function() {
		deepEqual(mainModule.LCHAPIActionsForType('alfa', [kTesting.StubRecipeObjectAction()]), []);
	});

	it('excludes if LCHRecipeInputTypes match second param', function() {
		deepEqual(mainModule.LCHAPIActionsForType('charlie', [kTesting.StubRecipeObjectAction()]), []);
	});

	it('includes if LCHRecipeInputTypes match first param', function() {
		let item = kTesting.StubRecipeObjectAction();
		deepEqual(mainModule.LCHAPIActionsForType('bravo', [item]), [item]);
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

		it('returns frozen object', function() {
			deepEqual(mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}), Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCallback() {
					this.api.fn = function () {
						return function () {
							return 'charlie'
						}
					}
					return this.api.fn('alfa')('bravo');
				},
				LCHRecipeSignature: 'charlie',
			})]).fn('charlie')(), 'hello bravo');
		});

	});

});

describe('LCHCompositionModelErrors', function testLCHCompositionModelErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHCompositionModelErrors(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object if LCHCompositionAction not Action', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionAction: kTesting.StubRecipeObjectValid(),
		})), {
			LCHCompositionAction: [
				'LCHErrorInputInvalid',
			],
		});
	});

	it('returns object if LCHCompositionSubjectPrimary not Subject', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionSubjectPrimary: kTesting.StubRecipeObjectValid(),
		})), {
			LCHCompositionSubjectPrimary: [
				'LCHErrorInputInvalid',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(kTesting.StubCompositionObjectValid()), null);
	});

	context('LCHCompositionSubjectSecondary', function() {

		it('returns object if LCHCompositionSubjectSecondary not Subject', function() {
			deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
				LCHCompositionSubjectSecondary: kTesting.StubRecipeObjectValid(),
			})), {
				LCHCompositionSubjectSecondary: [
					'LCHErrorInputInvalid',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
				LCHCompositionSubjectSecondary: kTesting.StubRecipeObjectSubject(),
			})), null);
		});

	});

});

describe('LCHAPIExecuteComposition', function testLCHAPIExecuteComposition() {

	it('throws error if param1 not LCHComposition', async function() {
		await rejects(mainModule.LCHAPIExecuteComposition({}, kTesting.StubAPIObjectValid()), /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not API object', async function() {
		await rejects(mainModule.LCHAPIExecuteComposition(kTesting.StubCompositionObjectValid(), {}), /LCHErrorInputInvalid/);
	});

	it('returns output', async function() {
		deepEqual(await mainModule.LCHAPIExecuteComposition(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionAction: Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeCallback (inputData) {
					return ['alfa', inputData].join(' ');
				}
			}),
			LCHCompositionSubjectPrimary: Object.assign(kTesting.StubRecipeObjectSubject(), {
				LCHRecipeCallback () {
					return 'bravo';
				}
			}),
		}), kTesting.StubAPIObjectValid()), 'alfa bravo');
	});

	it('returns output if LCHCompositionSubjectSecondary', async function() {
		deepEqual(await mainModule.LCHAPIExecuteComposition(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionAction: Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeCallback (param1, param2) {
					return ['alfa', param1, param2].join(' ');
				}
			}),
			LCHCompositionSubjectPrimary: Object.assign(kTesting.StubRecipeObjectSubject(), {
				LCHRecipeCallback () {
					return 'bravo';
				}
			}),
			LCHCompositionSubjectSecondary: Object.assign(kTesting.StubRecipeObjectSubject(), {
				LCHRecipeCallback () {
					return 'charlie';
				}
			}),
		}), kTesting.StubAPIObjectValid()), 'alfa bravo charlie');
	});

});

describe('LCHAPIExecuteRecipe', function testLCHAPIExecuteRecipe() {

	it('throws error if param1 not LCHRecipe', async function() {
		await rejects(mainModule.LCHAPIExecuteRecipe({}, [], kTesting.StubAPIObjectValid()), /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not array', async function() {
		await rejects(mainModule.LCHAPIExecuteRecipe({}, null, kTesting.StubAPIObjectValid()), /LCHErrorInputInvalid/);
	});

	it('throws error if param3 not API object', async function() {
		await rejects(mainModule.LCHAPIExecuteRecipe(kTesting.StubRecipeObjectValid(), [], {}), /LCHErrorInputInvalid/);
	});

	it('returns output', async function() {
		deepEqual(await mainModule.LCHAPIExecuteRecipe(Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback () {
				return 'alfa';
			},
		}), [], kTesting.StubAPIObjectValid()), 'alfa');
	});

	it('binds api', async function() {
		deepEqual(await mainModule.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api.fn('alfa')();
			},
		}, [], mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback() {
				return 'bravo';
			},
			LCHRecipeSignature: 'alfa',
		})])), 'bravo');
	});

	it('binds copy', async function() {
		let item = Object.assign(kTesting.StubAPIObjectValid(), {
			alfa: 'bravo',
		});

		await mainModule.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api.alfa = 'charlie';
			},
		}, [], item);

		deepEqual(item.alfa, 'bravo');
	});

	it('resolves promise if async', async function() {
		deepEqual(await mainModule.LCHAPIExecuteRecipe({
			async LCHRecipeCallback() {
				return Promise.resolve(this.api.fn('alfa')());
			},
		}, [], mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback() {
				return 'bravo';
			},
			LCHRecipeSignature: 'alfa',
		})])), 'bravo');
	});

	it('resolves promise if not async', async function() {
		deepEqual(await mainModule.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api.fn('alfa')();
			},
		}, [], mainModule.LCHAPIObjectFor([Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback() {
				return Promise.resolve('bravo');
			},
			LCHRecipeSignature: 'alfa',
		})])), 'bravo');
	});

	it('passes param2 to arguments', async function() {
		deepEqual(await mainModule.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return  Array.prototype.slice.call(arguments).join(' ');
			},
		}, ['alfa', 'bravo', 'charlie', 'delta'], kTesting.StubAPIObjectValid()), 'alfa bravo charlie delta');
	});

	it('runs _LCHAPIExecuteRecipePrior', async function() {
		let item = 'alfa';
		await mainModule.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {},
			bravo: 'charlie',
		}, [], Object.assign(kTesting.StubAPIObjectValid(), {
			_LCHAPIExecuteRecipePrior (e) {
				item = e.bravo;
			},
		}));
		deepEqual(item, 'charlie');
	});

	it('deletes _LCHAPIExecuteRecipePrior', async function() {
		deepEqual(await mainModule.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api._LCHAPIExecuteRecipePrior;
			},
		}, [], Object.assign(kTesting.StubAPIObjectValid(), {
			_LCHAPIExecuteRecipePrior () {
				item = true;
			},
		})), undefined);
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
