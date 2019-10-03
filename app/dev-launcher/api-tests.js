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
			LCHComponentDescriptorCompletionHandlerSignature: 'bravo',
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
			LCHRecipeInputTypes: 'bravo',
			LCHRecipeCallback (charlie) {},
		});
	},
	StubRecipeObjectType() {
		return Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeSignature: 'alfa',
			LCHRecipeCallback (inputData) {
				return typeof inputData.bravo === 'string';
			},
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback () {
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

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHRecipesModelErrorsFor(null);
		}, /LCHErrorInputNotValid/);
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

	it('returns object if LCHOptionValidateIfNotPresent', function() {
		deepEqual(Array.isArray(Object.keys(mainModule.LCHRecipesModelErrorsFor(kTesting.StubRecipeObjectValid(), {
			LCHOptionValidateIfNotPresent: true,
		}))), true);
	});

	context('LCHRecipeName', function() {

		it('returns object if not filled', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: '',
			})), {
				LCHRecipeName: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: ' ',
			})), {
				LCHRecipeName: [
					'LCHErrorNotFilled',
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
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: '',
			})), {
				LCHRecipeInputTypes: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: ' ',
			})), {
				LCHRecipeInputTypes: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: 'alfa',
			})), null);
		});

		it('allows comma', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: 'alfa,bravo',
			})), null);
		});

	});

	context('LCHRecipeOutputType', function() {

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

	context('LCHRecipeSignature', function() {

		it('returns object if LCHRecipeSignature empty', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: '',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if contains untrimmed whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: ' alfa',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotTrimmed',
				],
			});
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: 'alfa ',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: ' ',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeCanonicalExampleCallback', function() {

		it('returns object if LCHRecipeCanonicalExampleCallback not function', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCanonicalExampleCallback: null,
			})), {
				LCHRecipeCanonicalExampleCallback: [
					'LCHErrorNotFunction',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mainModule.LCHRecipesModelErrorsFor(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCanonicalExampleCallback () {},
			})), null);
		});

	});

});

describe('LCHRecipesModelIsCommand', function testLCHRecipesModelIsCommand() {

	it('throws if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsCommand({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeInputTypes: 'alfa',
		})), false);
	});

	it('returns false if LCHRecipeOutputType', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsCommand(kTesting.StubRecipeObjectCommand()), true);
	});

});

describe('LCHRecipesModelIsSubject', function testLCHRecipesModelIsSubject() {

	it('throws if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsSubject({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeName: undefined,
		})), false);
	});

	// it('returns false if arguments', function() {
	// 	deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
	// 		LCHRecipeInputTypes: 'alfa',
	// 	})), false);
	// });

	it('returns false if no LCHRecipeOutputType', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeOutputType: undefined,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsSubject(kTesting.StubRecipeObjectSubject()), true);
	});

});

describe('LCHRecipesModelIsAction', function testLCHRecipesModelIsAction() {

	it('throws if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsAction({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mainModule.LCHRecipesModelIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if no LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: undefined,
		})), false);
	});

	// it('returns false if no arguments', function() {
	// 	deepEqual(mainModule.LCHRecipesModelIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
	// 		LCHRecipeCallback () {},
	// 	})), false);
	// });

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsAction(kTesting.StubRecipeObjectAction()), true);
	});

});

describe('LCHRecipesModelIsType', function testLCHRecipesModelIsType() {

	it('throws if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsType({});
		}, /LCHErrorInputNotValid/);
	});

	// it('returns false if no arguments', function() {
	// 	deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
	// 		LCHRecipeCallback () {},
	// 	})), false);
	// });

	// it('returns false if more than one argument', function() {
	// 	deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
	// 		LCHRecipeCallback (alfa, bravo) {},
	// 	})), false);
	// });

	it('returns false if LCHRecipeOutputType not Bool', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns false if no LCHRecipeCanonicalExampleCallback', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeCanonicalExampleCallback: undefined,
		})), false);
	});

	it('returns false if no LCHRecipeSignature', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: undefined,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelIsType(kTesting.StubRecipeObjectType()), true);
	});

});

describe('LCHRecipesModelIsTask', function testLCHRecipesModelIsTask() {

	it('throws if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelIsTask({});
		}, /LCHErrorInputNotValid/);
	});

	// it('returns false if arguments', function() {
	// 	deepEqual(mainModule.LCHRecipesModelIsTask(Object.assign(kTesting.StubRecipeObjectTask(), {
	// 		LCHRecipeCallback (alfa) {},
	// 	})), false);
	// });

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

import { LCHTypeServiceSearchRecipe } from './recipes/types/ServiceSearch/main.js';
describe('LCHLauncherConvertTypeServiceSearch', function testLCHLauncherConvertTypeServiceSearch() {

	it('throws if not array', function() {
		throws(function() {
			mainModule.LCHLauncherConvertTypeServiceSearch(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns inputData', function() {
		let item = Object.assign(LCHTypeServiceSearchRecipe().LCHRecipeCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		});
		deepEqual(mainModule.LCHLauncherConvertTypeServiceSearch([item]), [item]);
	});

	it('excludes if not object', function() {
		deepEqual(mainModule.LCHLauncherConvertTypeServiceSearch([null]), []);
	});

	context('TypeServiceSearch', function() {

		const item = mainModule.LCHLauncherConvertTypeServiceSearch([LCHTypeServiceSearchRecipe().LCHRecipeCanonicalExampleCallback()], function (inputData) {
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
				})('alfa'), ['alfa', 'http://example.com?q=LCHSEARCHTOKEN']);
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

	it('throws if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesObject({});
		}, /LCHErrorInputNotValid/);
	});

	it('throws if not Action', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeName: undefined,
			}));
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if less than two LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa',
		})), false);
	});

	// it('returns false if less than two arguments', function() {
	// 	deepEqual(mainModule.LCHRecipesModelActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
	// 		LCHRecipeCallback (alfa) {},
	// 	})), false);
	// });

	it('returns true', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, bravo',
			LCHRecipeCallback (charlie, delta) {},
		})), true);
	});

});

describe('LCHRecipesModelActionTakesParams', function testLCHRecipesModelActionTakesParams() {

	it('throws if not valid', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesParams({});
		}, /LCHErrorInputNotValid/);
	});

	it('throws if not Action', function() {
		throws(function() {
			mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeName: undefined,
			}));
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if last LCHRecipeInputTypes not Object', function() {
		deepEqual(mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, bravo, charlie',
		})), false);
	});

	// it('returns false if arguments count not match LCHRecipeInputTypes', function() {
	// 	deepEqual(mainModule.LCHRecipesModelActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
	// 		LCHRecipeCallback (alfa, bravo, charlie) {},
	// 	})), false);
	// });

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

describe('LCHAPITypeEquivalenceMapForRecipes', function testLCHAPITypeEquivalenceMapForRecipes() {

	it('throws if not array', function() {
		throws(function() {
			mainModule.LCHAPITypeEquivalenceMapForRecipes(null);
		}, /LCHErrorInputNotValid/);
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
			LCHRecipeCanonicalExampleCallback: undefined,
		})]), {});
	});

	it('excludes if not type', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeOutputType: 'alfa',
		})]), {});
	});

	it('excludes if LCHRecipeCanonicalExampleCallback fails', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeCanonicalExampleCallback () {
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
				LCHRecipeCanonicalExampleCallback () {
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

	it('maps if one equivalent', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([
			{
				LCHRecipeSignature: 'String',
				LCHRecipeCallback (inputData) {
					return typeof inputData === 'string';
				},
				LCHRecipeOutputType: 'Bool',
				LCHRecipeCanonicalExampleCallback () {
					return 'alfa';
				},
			},
			{
				LCHRecipeSignature: 'URL',
				LCHRecipeCallback (inputData) {
					return inputData === 'http';
				},
				LCHRecipeOutputType: 'Bool',
				LCHRecipeCanonicalExampleCallback () {
					return 'http';
				},
			},
		]), {
			String: ['String'],
			URL: ['String', 'URL'],
		});
	});

	it('excludes if duplicate', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([
			Object.assign(kTesting.StubRecipeObjectType(), {
				LCHRecipeCallback (inputData) {
					return typeof inputData.foxtrot === 'string';
				},
				LCHRecipeCanonicalExampleCallback () {
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
				LCHRecipeCanonicalExampleCallback () {
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

	it('maps if _LCHRecipeTypeIsExclusive', function() {
		deepEqual(mainModule.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'echo',
			_LCHRecipeTypeIsExclusive: true,
		})]), {
			alfa: ['alfa'],
			echo: ['echo'],
		});
	});

});

describe('LCHAPITypeNameMap', function testLCHAPITypeNameMap() {

	it('throws if not array', function() {
		throws(function() {
			mainModule.LCHAPITypeNameMap(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHAPITypeNameMap([]), 'object');
	});

	it('excludes if not valid', function() {
		deepEqual(mainModule.LCHAPITypeNameMap([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: '',
		})]), {});
	});

	it('excludes if not Type', function() {
		deepEqual(mainModule.LCHAPITypeNameMap([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: undefined,
		})]), {});
	});

	it('creates map for single', function() {
		deepEqual(mainModule.LCHAPITypeNameMap([kTesting.StubRecipeObjectType()]), {
			alfa: 'alfa',
		});
	});

	it('creates map for multiple', function() {
		deepEqual(mainModule.LCHAPITypeNameMap([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'bravo',
		})]), {
			alfa: 'alfa',
			bravo: 'bravo',
		});
	});

	it('maps if LCHRecipeName', function() {
		deepEqual(mainModule.LCHAPITypeNameMap([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeName: 'bravo',
		})]), {
			alfa: 'bravo',
		});
	});

	it('excludes duplicates', function() {
		deepEqual(mainModule.LCHAPITypeNameMap([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeName: 'bravo',
		})]), {
			alfa: 'alfa',
		});
	});

});

describe('LCHAPIActionsForType', function testLCHAPIActionsForType() {

	it('throws if param1 not string', function() {
		throws(function() {
			mainModule.LCHAPIActionsForType(null, []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not array', function() {
		throws(function() {
			mainModule.LCHAPIActionsForType('', null);
		}, /LCHErrorInputNotValid/);
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

	it('throws if param1 not string', function() {
		throws(function() {
			mainModule.LCHAPISubjectsForType(null, []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not array', function() {
		throws(function() {
			mainModule.LCHAPISubjectsForType('', null);
		}, /LCHErrorInputNotValid/);
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

describe('LCHCompositionModelErrors', function testLCHCompositionModelErrors() {

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHCompositionModelErrors(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHCompositionAction not present', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionAction: undefined,
		})), {
			LCHCompositionAction: [
				'LCHErrorInputNotPresent',
			],
		});
	});

	it('returns object if LCHCompositionAction not Action', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionAction: kTesting.StubRecipeObjectValid(),
		})), {
			LCHCompositionAction: [
				'LCHErrorInputNotValid',
			],
		});
	});

	it('returns object if LCHCompositionSubjectPrimary blank', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionSubjectPrimary: undefined,
		})), {
			LCHCompositionSubjectPrimary: [
				'LCHErrorInputNotPresent',
			],
		});
	});
	
	it('returns object if LCHCompositionSubjectPrimary not Subject', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionSubjectPrimary: kTesting.StubRecipeObjectValid(),
		})), {
			LCHCompositionSubjectPrimary: [
				'LCHErrorInputNotValid',
			],
		});
	});

	it('returns object if type mismatch', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionSubjectPrimary: Object.assign(kTesting.StubRecipeObjectSubject(), {
				LCHRecipeOutputType: 'alfa',
			}),
		})), {
			LCHCompositionSubjectPrimary: [
				'LCHErrorInputNotValid',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHCompositionModelErrors(kTesting.StubCompositionObjectValid()), null);
	});

	it('returns null if running command', function() {
		deepEqual(mainModule.LCHCompositionModelErrors({
			LCHCompositionAction: Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeInputTypes: 'Command'
			}),
			LCHCompositionSubjectPrimary: kTesting.StubRecipeObjectCommand(),
		}), null);
	});

	context('LCHCompositionSubjectSecondary', function() {

		it('returns object if LCHCompositionSubjectSecondary not Subject', function() {
			deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
				LCHCompositionAction: Object.assign(kTesting.StubRecipeObjectAction(), {
					LCHRecipeInputTypes: 'bravo, bravo',
				}),
				LCHCompositionSubjectSecondary: kTesting.StubRecipeObjectValid(),
			})), {
				LCHCompositionSubjectSecondary: [
					'LCHErrorInputNotValid',
				],
			});
		});

		it('returns object if LCHCompositionSubjectSecondary type mismatch', function() {
			deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
				LCHCompositionAction: Object.assign(kTesting.StubRecipeObjectAction(), {
					LCHRecipeInputTypes: 'bravo, bravo',
				}),
				LCHCompositionSubjectSecondary: Object.assign(kTesting.StubRecipeObjectSubject(), {
					LCHRecipeOutputType: 'alfa',
				}),
			})), {
				LCHCompositionSubjectSecondary: [
					'LCHErrorInputNotValid',
				],
			});
		});

		it('returns object if LCHCompositionSubjectSecondary blank', function() {
			deepEqual(mainModule.LCHCompositionModelErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
				LCHCompositionAction: Object.assign(kTesting.StubRecipeObjectAction(), {
					LCHRecipeInputTypes: 'bravo, bravo',
				}),
			})), {
				LCHCompositionSubjectSecondary: [
					'LCHErrorInputNotValid',
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

	it('rejects if param1 not LCHComposition', async function() {
		await rejects(mainModule.LCHAPIExecuteComposition({}, kTesting.StubAPIObjectValid()), /LCHErrorInputNotValid/);
	});

	it('rejects if param2 not API object', async function() {
		await rejects(mainModule.LCHAPIExecuteComposition(kTesting.StubCompositionObjectValid(), {}), /LCHErrorInputNotValid/);
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

import { LCHRuntimeAPI } from '../_shared/LCHRuntime/main.js';

describe('LCHAPIExecuteRecipe', function testLCHAPIExecuteRecipe() {

	it('rejects if param1 not valid', async function() {
		await rejects(mainModule.LCHAPIExecuteRecipe({}, [], kTesting.StubAPIObjectValid()), /LCHErrorInputNotValid/);
	});

	it('rejects if param2 not array', async function() {
		await rejects(mainModule.LCHAPIExecuteRecipe({}, null, kTesting.StubAPIObjectValid()), /LCHErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function() {
		await rejects(mainModule.LCHAPIExecuteRecipe(kTesting.StubRecipeObjectValid(), [], {}), /LCHErrorInputNotValid/);
	});

	it('resolves LCHRecipeCallback output', async function() {
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
		}, [], LCHRuntimeAPI([Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback() {
				return 'bravo';
			},
			LCHRecipeSignature: 'alfa',
		})])), 'bravo');
	});

	it('binds exact value', async function() {
		let item = kTesting.StubAPIObjectValid();

		deepEqual(await mainModule.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api === item;
			},
		}, [], item), true);
	});

	it('resolves promise if async', async function() {
		deepEqual(await mainModule.LCHAPIExecuteRecipe({
			async LCHRecipeCallback() {
				return Promise.resolve(this.api.fn('alfa')());
			},
		}, [], LCHRuntimeAPI([Object.assign(kTesting.StubRecipeObjectValid(), {
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
		}, [], LCHRuntimeAPI([Object.assign(kTesting.StubRecipeObjectValid(), {
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

});

describe('LCHComponentDescriptorsModelErrorsFor', function testLCHComponentDescriptorsModelErrorsFor() {

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHComponentDescriptorsModelErrorsFor(null);
		}, /LCHErrorInputNotValid/);
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

	it('returns object if LCHComponentDescriptorCompletionHandlerSignature not string', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: null,
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandlerSignature empty', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: '',
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandlerSignature contains untrimmed whitespace', function() {
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: ' alfa',
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
				'LCHErrorNotTrimmed',
			],
		});
		deepEqual(mainModule.LCHComponentDescriptorsModelErrorsFor(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: 'alfa ',
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
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

describe('LCHRuntimeFilteredRecipes', function testLCHRuntimeFilteredRecipes() {

	const uStubItem = function () {
		return {
			LCHRecipeCallback () {},
		};
	};	

	it('throws if param1 not array', function () {
		throws(function () {
			mainModule.LCHRuntimeFilteredRecipes(null, '')
		}, /ErrorInputInvalid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mainModule.LCHRuntimeFilteredRecipes([], null)
		}, /ErrorInputInvalid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.LCHRuntimeFilteredRecipes([], ''), [])
	});

	it('excludes if not valid', function() {
		deepEqual(mainModule.LCHRuntimeFilteredRecipes([{}], ''), []);
	});

	it('includes if no LCHRecipeURLFilter', function() {
		const item = uStubItem();
		deepEqual(mainModule.LCHRuntimeFilteredRecipes([item], 'alfa'), [item]);
	});

	context('LCHRecipeURLFilter', function () {

		it('includes if wildcard', function() {
			const item = Object.assign(uStubItem(), {
				LCHRecipeURLFilter: '*',
			});

			deepEqual(mainModule.LCHRuntimeFilteredRecipes([item], 'alfa'), [item]);
		});

		it('excludes if param2 not match', function() {
			const item = Object.assign(uStubItem(), {
				LCHRecipeURLFilter: 'alfa',
			});
			
			deepEqual(mainModule.LCHRuntimeFilteredRecipes([item], 'bravo'), []);
		});
		
		it('includes if param2 match', function() {
			const item = Object.assign(uStubItem(), {
				LCHRecipeURLFilter: 'alfa',
			});
			
			deepEqual(mainModule.LCHRuntimeFilteredRecipes([item], 'alfa'), [item]);
		});
	
	});

});

describe('LCHRuntimeFilteredTasks', function testLCHRuntimeFilteredTasks() {

	const uStubItem = function () {
		return {
			LCHRecipeCallback () {},
			LCHRecipeURLFilter: '*',
			LCHRecipeIsAutomatic: true,
		};
	}

	it('throws if not array', function () {
		throws(function () {
			mainModule.LCHRuntimeFilteredTasks(null)
		}, /ErrorInputInvalid/);
	});

	it('returns array', function () {
		deepEqual(mainModule.LCHRuntimeFilteredTasks([]), [])
	});

	it('excludes if not task', function() {
		deepEqual(mainModule.LCHRuntimeFilteredTasks([{
			LCHRecipeCallback () {},
		}], ''), []);
	});

	it('excludes if LCHRecipeIsExcluded', function() {
		deepEqual(mainModule.LCHRuntimeFilteredTasks([Object.assign(uStubItem(), {
			LCHRecipeIsExcluded () {
				return true;
			},
		})], ''), []);
	});

});

describe('LCHAPIRunTasks', function testLCHAPIRunTasks() {

	const uStubItem = function () {
		return {
			LCHRecipeCallback () {
				return 'alfa';
			},
			LCHRecipeURLFilter: '*',
			LCHRecipeIsAutomatic: true,
		};
	}

	it('excludes if not matching', async function() {
		deepEqual(await mainModule.LCHAPIRunTasks([Object.assign(uStubItem(), {
			LCHRecipeURLFilter: 'bravo',
		})], 'charlie'), []);
	});

	it('runs callback', async function() {
		deepEqual(await mainModule.LCHAPIRunTasks([uStubItem()], '*'), ['alfa']);
	});

	it('binds standard api', async function() {
		deepEqual((await mainModule.LCHAPIRunTasks([Object.assign(uStubItem(), {
			LCHRecipeCallback () {
				return this.api.LCHDateLocalOffsetSubtracted(new Date());
			},
		})], '*')).pop() instanceof Date, true);
	});

});
