const { throws, rejects, deepEqual } = require('assert');

const mod = require('./api.js').default;

import LCHRuntime from '../_shared/LCHRuntime/main.js';

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
	StubRecipeProxyObjectValid() {
		return {
			LCHRecipeProxyName: 'alfa',
			LCHRecipeProxySignature: 'bravo',
		};
	},
};

describe('LCHRecipesErrors', function test_LCHRecipesErrors() {

	it('throws if not object', function() {
		throws(function() {
			mod.LCHRecipesErrors(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHRecipeCallback not function', function() {
		deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback: null,
		})), {
			LCHRecipeCallback: [
				'LCHErrorNotFunction',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.LCHRecipesErrors(kTesting.StubRecipeObjectValid()), null);
	});

	it('returns object if LCHOptionValidateIfNotPresent', function() {
		deepEqual(Array.isArray(Object.keys(mod.LCHRecipesErrors(kTesting.StubRecipeObjectValid(), {
			LCHOptionValidateIfNotPresent: true,
		}))), true);
	});

	context('LCHRecipeName', function() {

		it('returns object if not filled', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: '',
			})), {
				LCHRecipeName: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: ' ',
			})), {
				LCHRecipeName: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeName: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeInputTypes', function() {

		it('returns object if not filled', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: '',
			})), {
				LCHRecipeInputTypes: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: ' ',
			})), {
				LCHRecipeInputTypes: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: 'alfa',
			})), null);
		});

		it('allows comma', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeInputTypes: 'alfa,bravo',
			})), null);
		});

	});

	context('LCHRecipeOutputType', function() {

		it('returns object if not filled', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: '',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if not trimmed', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: ' alfa ',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: ' ',
			})), {
				LCHRecipeOutputType: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeOutputType: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeSignature', function() {

		it('returns object if LCHRecipeSignature empty', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: '',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns object if contains untrimmed whitespace', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: ' alfa',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotTrimmed',
				],
			});
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: 'alfa ',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotTrimmed',
				],
			});
		});

		it('returns object if only whitespace', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: ' ',
			})), {
				LCHRecipeSignature: [
					'LCHErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeSignature: 'alfa',
			})), null);
		});

	});

	context('LCHRecipeCanonicalExampleCallback', function() {

		it('returns object if LCHRecipeCanonicalExampleCallback not function', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCanonicalExampleCallback: null,
			})), {
				LCHRecipeCanonicalExampleCallback: [
					'LCHErrorNotFunction',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHRecipesErrors(Object.assign(kTesting.StubRecipeObjectValid(), {
				LCHRecipeCanonicalExampleCallback () {},
			})), null);
		});

	});

});

describe('LCHRecipesIsCommand', function test_LCHRecipesIsCommand() {

	it('throws if not valid', function() {
		throws(function() {
			mod.LCHRecipesIsCommand({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mod.LCHRecipesIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if arguments', function() {
		deepEqual(mod.LCHRecipesIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeInputTypes: 'alfa',
		})), false);
	});

	it('returns false if LCHRecipeOutputType', function() {
		deepEqual(mod.LCHRecipesIsCommand(Object.assign(kTesting.StubRecipeObjectCommand(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHRecipesIsCommand(kTesting.StubRecipeObjectCommand()), true);
	});

});

describe('LCHRecipesIsSubject', function test_LCHRecipesIsSubject() {

	it('throws if not valid', function() {
		throws(function() {
			mod.LCHRecipesIsSubject({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mod.LCHRecipesIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeName: undefined,
		})), false);
	});

	// it('returns false if arguments', function() {
	// 	deepEqual(mod.LCHRecipesIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
	// 		LCHRecipeInputTypes: 'alfa',
	// 	})), false);
	// });

	it('returns false if no LCHRecipeOutputType', function() {
		deepEqual(mod.LCHRecipesIsSubject(Object.assign(kTesting.StubRecipeObjectSubject(), {
			LCHRecipeOutputType: undefined,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHRecipesIsSubject(kTesting.StubRecipeObjectSubject()), true);
	});

});

describe('LCHRecipesIsAction', function test_LCHRecipesIsAction() {

	it('throws if not valid', function() {
		throws(function() {
			mod.LCHRecipesIsAction({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHRecipeName', function() {
		deepEqual(mod.LCHRecipesIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeName: undefined,
		})), false);
	});

	it('returns false if no LCHRecipeInputTypes', function() {
		deepEqual(mod.LCHRecipesIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: undefined,
		})), false);
	});

	// it('returns false if no arguments', function() {
	// 	deepEqual(mod.LCHRecipesIsAction(Object.assign(kTesting.StubRecipeObjectAction(), {
	// 		LCHRecipeCallback () {},
	// 	})), false);
	// });

	it('returns true', function() {
		deepEqual(mod.LCHRecipesIsAction(kTesting.StubRecipeObjectAction()), true);
	});

});

describe('LCHRecipesIsType', function test_LCHRecipesIsType() {

	it('throws if not valid', function() {
		throws(function() {
			mod.LCHRecipesIsType({});
		}, /LCHErrorInputNotValid/);
	});

	// it('returns false if no arguments', function() {
	// 	deepEqual(mod.LCHRecipesIsType(Object.assign(kTesting.StubRecipeObjectType(), {
	// 		LCHRecipeCallback () {},
	// 	})), false);
	// });

	// it('returns false if more than one argument', function() {
	// 	deepEqual(mod.LCHRecipesIsType(Object.assign(kTesting.StubRecipeObjectType(), {
	// 		LCHRecipeCallback (alfa, bravo) {},
	// 	})), false);
	// });

	it('returns false if LCHRecipeOutputType not Bool', function() {
		deepEqual(mod.LCHRecipesIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeOutputType: 'alfa',
		})), false);
	});

	it('returns false if no LCHRecipeCanonicalExampleCallback', function() {
		deepEqual(mod.LCHRecipesIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeCanonicalExampleCallback: undefined,
		})), false);
	});

	it('returns false if no LCHRecipeSignature', function() {
		deepEqual(mod.LCHRecipesIsType(Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: undefined,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHRecipesIsType(kTesting.StubRecipeObjectType()), true);
	});

});

describe('LCHRecipesIsTask', function test_LCHRecipesIsTask() {

	it('throws if not valid', function() {
		throws(function() {
			mod.LCHRecipesIsTask({});
		}, /LCHErrorInputNotValid/);
	});

	// it('returns false if arguments', function() {
	// 	deepEqual(mod.LCHRecipesIsTask(Object.assign(kTesting.StubRecipeObjectTask(), {
	// 		LCHRecipeCallback (alfa) {},
	// 	})), false);
	// });

	it('returns false if no LCHRecipeURLFilter', function() {
		deepEqual(mod.LCHRecipesIsTask(Object.assign(kTesting.StubRecipeObjectTask(), {
			LCHRecipeURLFilter: undefined,
		})), false);
	});

	it('returns false if LCHRecipeIsAutomatic not true', function() {
		deepEqual(mod.LCHRecipesIsTask(Object.assign(kTesting.StubRecipeObjectTask(), {
			LCHRecipeIsAutomatic: false,
		})), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHRecipesIsTask(kTesting.StubRecipeObjectTask()), true);
	});

});

import { LCHTypeServiceSearchRecipe } from './recipes/types/ServiceSearch/main.js';
describe('LCHLauncherConvertTypeServiceSearch', function test_LCHLauncherConvertTypeServiceSearch() {

	it('throws if not array', function() {
		throws(function() {
			mod.LCHLauncherConvertTypeServiceSearch(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns inputData', function() {
		let item = Object.assign(LCHTypeServiceSearchRecipe().LCHRecipeCanonicalExampleCallback(), {
			LCHRecipeOutputType: 'alfa',
		});
		deepEqual(mod.LCHLauncherConvertTypeServiceSearch([item]), [item]);
	});

	it('excludes if not object', function() {
		deepEqual(mod.LCHLauncherConvertTypeServiceSearch([null]), []);
	});

	context('TypeServiceSearch', function() {

		const item = mod.LCHLauncherConvertTypeServiceSearch([LCHTypeServiceSearchRecipe().LCHRecipeCanonicalExampleCallback()], function (inputData) {
			return `Search: ${ inputData }`;
		})[0];

		it('replaces with action', function() {
			deepEqual(mod.LCHRecipesIsAction(item), true);
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
				})('alfa'), ['alfa', 'https://example.com?q=LCHSEARCHTOKEN']);
			});
			
		});

		context('_LCHLauncherGenerated', function() {

			it('returns boolean', function() {
				deepEqual(item._LCHLauncherGenerated, true);
			});
			
		});

	});

});

describe('LCHRecipesActionTakesObject', function test_LCHRecipesActionTakesObject() {

	it('throws if not valid', function() {
		throws(function() {
			mod.LCHRecipesActionTakesObject({});
		}, /LCHErrorInputNotValid/);
	});

	it('throws if not Action', function() {
		throws(function() {
			mod.LCHRecipesActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeName: undefined,
			}));
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if less than two LCHRecipeInputTypes', function() {
		deepEqual(mod.LCHRecipesActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa',
		})), false);
	});

	// it('returns false if less than two arguments', function() {
	// 	deepEqual(mod.LCHRecipesActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
	// 		LCHRecipeCallback (alfa) {},
	// 	})), false);
	// });

	it('returns true', function() {
		deepEqual(mod.LCHRecipesActionTakesObject(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, bravo',
			LCHRecipeCallback (charlie, delta) {},
		})), true);
	});

});

describe('LCHRecipesActionTakesParams', function test_LCHRecipesActionTakesParams() {

	it('throws if not valid', function() {
		throws(function() {
			mod.LCHRecipesActionTakesParams({});
		}, /LCHErrorInputNotValid/);
	});

	it('throws if not Action', function() {
		throws(function() {
			mod.LCHRecipesActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeName: undefined,
			}));
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if last LCHRecipeInputTypes not Object', function() {
		deepEqual(mod.LCHRecipesActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, bravo, charlie',
		})), false);
	});

	// it('returns false if arguments count not match LCHRecipeInputTypes', function() {
	// 	deepEqual(mod.LCHRecipesActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
	// 		LCHRecipeCallback (alfa, bravo, charlie) {},
	// 	})), false);
	// });

	it('returns true', function() {
		deepEqual(mod.LCHRecipesActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, bravo, Object',
			LCHRecipeCallback (charlie, delta, echo) {},
		})), true);
	});

	it('accepts two arguments', function() {
		deepEqual(mod.LCHRecipesActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'alfa, Object',
			LCHRecipeCallback (charlie, echo) {},
		})), true);
	});

	it('accepts one argument', function() {
		deepEqual(mod.LCHRecipesActionTakesParams(Object.assign(kTesting.StubRecipeObjectAction(), {
			LCHRecipeInputTypes: 'Object',
			LCHRecipeCallback (echo) {},
		})), true);
	});

});

describe('LCHAPITypeEquivalenceMapForRecipes', function test_LCHAPITypeEquivalenceMapForRecipes() {

	it('throws if not array', function() {
		throws(function() {
			mod.LCHAPITypeEquivalenceMapForRecipes(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(typeof mod.LCHAPITypeEquivalenceMapForRecipes([]), 'object');
	});

	it('excludes if no LCHRecipeOutputType', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeOutputType: undefined,
		})]), {});
	});

	it('excludes if not valid', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeCanonicalExampleCallback: undefined,
		})]), {});
	});

	it('excludes if not type', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeOutputType: 'alfa',
		})]), {});
	});

	it('excludes if LCHRecipeCanonicalExampleCallback fails', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeCanonicalExampleCallback () {
				return {
					delta: 'charlie',
				};
			},
		})]), {});
	});

	it('creates map for single', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType()]), {
			alfa: ['alfa'],
		});
	});

	it('creates map for multiple', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'echo',
		})]), {
			alfa: ['alfa', 'echo'],
			echo: ['alfa', 'echo'],
		});
	});

	it('maps if equivalent', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'echo',
		})]), {
			alfa: ['alfa', 'echo'],
			echo: ['alfa', 'echo'],
		});
	});

	it('maps if not equivalent', function() {
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([
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
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([
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
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([
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
		deepEqual(mod.LCHAPITypeEquivalenceMapForRecipes([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'echo',
			_LCHRecipeTypeIsExclusive: true,
		})]), {
			alfa: ['alfa'],
			echo: ['echo'],
		});
	});

});

describe('LCHAPITypeNameMap', function test_LCHAPITypeNameMap() {

	it('throws if not array', function() {
		throws(function() {
			mod.LCHAPITypeNameMap(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(typeof mod.LCHAPITypeNameMap([]), 'object');
	});

	it('excludes if not valid', function() {
		deepEqual(mod.LCHAPITypeNameMap([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: '',
		})]), {});
	});

	it('excludes if not Type', function() {
		deepEqual(mod.LCHAPITypeNameMap([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: undefined,
		})]), {});
	});

	it('creates map for single', function() {
		deepEqual(mod.LCHAPITypeNameMap([kTesting.StubRecipeObjectType()]), {
			alfa: 'alfa',
		});
	});

	it('creates map for multiple', function() {
		deepEqual(mod.LCHAPITypeNameMap([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeSignature: 'bravo',
		})]), {
			alfa: 'alfa',
			bravo: 'bravo',
		});
	});

	it('maps if LCHRecipeName', function() {
		deepEqual(mod.LCHAPITypeNameMap([Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeName: 'bravo',
		})]), {
			alfa: 'bravo',
		});
	});

	it('excludes duplicates', function() {
		deepEqual(mod.LCHAPITypeNameMap([kTesting.StubRecipeObjectType(), Object.assign(kTesting.StubRecipeObjectType(), {
			LCHRecipeName: 'bravo',
		})]), {
			alfa: 'alfa',
		});
	});

});

describe('LCHAPIActionsForType', function test_LCHAPIActionsForType() {

	it('throws if param1 not string', function() {
		throws(function() {
			mod.LCHAPIActionsForType(null, []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not array', function() {
		throws(function() {
			mod.LCHAPIActionsForType('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod.LCHAPIActionsForType('', []), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mod.LCHAPIActionsForType('', [Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback: undefined,
		})]), []);
	});

	it('excludes if not Action', function() {
		deepEqual(mod.LCHAPIActionsForType('', [kTesting.StubRecipeObjectValid()]), []);
	});

	it('excludes if LCHRecipeInputTypes not match', function() {
		deepEqual(mod.LCHAPIActionsForType('alfa', [kTesting.StubRecipeObjectAction()]), []);
	});

	it('excludes if LCHRecipeInputTypes match second param', function() {
		deepEqual(mod.LCHAPIActionsForType('charlie', [kTesting.StubRecipeObjectAction()]), []);
	});

	it('includes if LCHRecipeInputTypes match first param', function() {
		let item = kTesting.StubRecipeObjectAction();
		deepEqual(mod.LCHAPIActionsForType('bravo', [item]), [item]);
	});

});

describe('LCHAPISubjectsForType', function test_LCHAPISubjectsForType() {

	it('throws if param1 not string', function() {
		throws(function() {
			mod.LCHAPISubjectsForType(null, []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not array', function() {
		throws(function() {
			mod.LCHAPISubjectsForType('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod.LCHAPISubjectsForType('', []), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mod.LCHAPISubjectsForType('', [Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback: undefined,
		})]), []);
	});

	it('excludes if not Subject', function() {
		deepEqual(mod.LCHAPISubjectsForType('', [kTesting.StubRecipeObjectValid()]), []);
	});

	it('excludes if LCHRecipeOutputType not match', function() {
		deepEqual(mod.LCHAPISubjectsForType('alfa', [kTesting.StubRecipeObjectSubject()]), []);
	});

	it('includes if LCHRecipeOutputType match', function() {
		let item = kTesting.StubRecipeObjectSubject();
		deepEqual(mod.LCHAPISubjectsForType('bravo', [item]), [item]);
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

describe('LCHCompositionErrors', function test_LCHCompositionErrors() {

	it('throws if not object', function() {
		throws(function() {
			mod.LCHCompositionErrors(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHCompositionAction not present', function() {
		deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionAction: undefined,
		})), {
			LCHCompositionAction: [
				'LCHErrorInputNotPresent',
			],
		});
	});

	it('returns object if LCHCompositionAction not Action', function() {
		deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionAction: kTesting.StubRecipeObjectValid(),
		})), {
			LCHCompositionAction: [
				'LCHErrorInputNotValid',
			],
		});
	});

	it('returns object if LCHCompositionSubjectPrimary blank', function() {
		deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionSubjectPrimary: undefined,
		})), {
			LCHCompositionSubjectPrimary: [
				'LCHErrorInputNotPresent',
			],
		});
	});
	
	it('returns object if LCHCompositionSubjectPrimary not Subject', function() {
		deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
			LCHCompositionSubjectPrimary: kTesting.StubRecipeObjectValid(),
		})), {
			LCHCompositionSubjectPrimary: [
				'LCHErrorInputNotValid',
			],
		});
	});

	it('returns object if type mismatch', function() {
		deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
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
		deepEqual(mod.LCHCompositionErrors(kTesting.StubCompositionObjectValid()), null);
	});

	it('returns null if running command', function() {
		deepEqual(mod.LCHCompositionErrors({
			LCHCompositionAction: Object.assign(kTesting.StubRecipeObjectAction(), {
				LCHRecipeInputTypes: 'Command'
			}),
			LCHCompositionSubjectPrimary: kTesting.StubRecipeObjectCommand(),
		}), null);
	});

	context('LCHCompositionSubjectSecondary', function() {

		it('returns object if LCHCompositionSubjectSecondary not Subject', function() {
			deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
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
			deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
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
			deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
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
			deepEqual(mod.LCHCompositionErrors(Object.assign(kTesting.StubCompositionObjectValid(), {
				LCHCompositionSubjectSecondary: kTesting.StubRecipeObjectSubject(),
			})), null);
		});

	});

});

describe('LCHAPIExecuteComposition', function test_LCHAPIExecuteComposition() {

	it('rejects if param1 not LCHComposition', async function() {
		await rejects(mod.LCHAPIExecuteComposition({}, kTesting.StubAPIObjectValid()), /LCHErrorInputNotValid/);
	});

	it('rejects if param2 not API object', async function() {
		await rejects(mod.LCHAPIExecuteComposition(kTesting.StubCompositionObjectValid(), {}), /LCHErrorInputNotValid/);
	});

	it('returns output', async function() {
		deepEqual(await mod.LCHAPIExecuteComposition(Object.assign(kTesting.StubCompositionObjectValid(), {
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
		deepEqual(await mod.LCHAPIExecuteComposition(Object.assign(kTesting.StubCompositionObjectValid(), {
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

describe('LCHAPIExecuteRecipe', function test_LCHAPIExecuteRecipe() {

	it('rejects if param1 not valid', async function() {
		await rejects(mod.LCHAPIExecuteRecipe({}, [], kTesting.StubAPIObjectValid()), /LCHErrorInputNotValid/);
	});

	it('rejects if param2 not array', async function() {
		await rejects(mod.LCHAPIExecuteRecipe({}, null, kTesting.StubAPIObjectValid()), /LCHErrorInputNotValid/);
	});

	it('rejects if param3 not valid', async function() {
		await rejects(mod.LCHAPIExecuteRecipe(kTesting.StubRecipeObjectValid(), [], {}), /LCHErrorInputNotValid/);
	});

	it('resolves LCHRecipeCallback output', async function() {
		deepEqual(await mod.LCHAPIExecuteRecipe(Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback () {
				return 'alfa';
			},
		}), [], kTesting.StubAPIObjectValid()), 'alfa');
	});

	it('binds api', async function() {
		deepEqual(await mod.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api.fn('alfa')();
			},
		}, [], LCHRuntime.LCHRuntimeAPI([Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback() {
				return 'bravo';
			},
			LCHRecipeSignature: 'alfa',
		})])), 'bravo');
	});

	it('binds exact value', async function() {
		let item = kTesting.StubAPIObjectValid();

		deepEqual(await mod.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api === item;
			},
		}, [], item), true);
	});

	it('resolves promise if async', async function() {
		deepEqual(await mod.LCHAPIExecuteRecipe({
			async LCHRecipeCallback() {
				return Promise.resolve(this.api.fn('alfa')());
			},
		}, [], LCHRuntime.LCHRuntimeAPI([Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback() {
				return 'bravo';
			},
			LCHRecipeSignature: 'alfa',
		})])), 'bravo');
	});

	it('resolves promise if not async', async function() {
		deepEqual(await mod.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return this.api.fn('alfa')();
			},
		}, [], LCHRuntime.LCHRuntimeAPI([Object.assign(kTesting.StubRecipeObjectValid(), {
			LCHRecipeCallback() {
				return Promise.resolve('bravo');
			},
			LCHRecipeSignature: 'alfa',
		})])), 'bravo');
	});

	it('passes param2 to arguments', async function() {
		deepEqual(await mod.LCHAPIExecuteRecipe({
			LCHRecipeCallback() {
				return  Array.prototype.slice.call(arguments).join(' ');
			},
		}, ['alfa', 'bravo', 'charlie', 'delta'], kTesting.StubAPIObjectValid()), 'alfa bravo charlie delta');
	});

});

describe('LCHComponentDescriptorsErrors', function test_LCHComponentDescriptorsErrors() {

	it('throws if not object', function() {
		throws(function() {
			mod.LCHComponentDescriptorsErrors(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object if LCHComponentDescriptorName not string', function() {
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: null,
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHComponentDescriptorName empty', function() {
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: '',
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHComponentDescriptorName contains untrimmed whitespace', function() {
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: ' alfa',
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotTrimmed',
			],
		});
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorName: 'alfa ',
		})), {
			LCHComponentDescriptorName: [
				'LCHErrorNotTrimmed',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandlerSignature not string', function() {
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: null,
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandlerSignature empty', function() {
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: '',
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
				'LCHErrorNotFilled',
			],
		});
	});

	it('returns object if LCHComponentDescriptorCompletionHandlerSignature contains untrimmed whitespace', function() {
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: ' alfa',
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
				'LCHErrorNotTrimmed',
			],
		});
		deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
			LCHComponentDescriptorCompletionHandlerSignature: 'alfa ',
		})), {
			LCHComponentDescriptorCompletionHandlerSignature: [
				'LCHErrorNotTrimmed',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.LCHComponentDescriptorsErrors(kTesting.StubComponentDescriptorObjectValid()), null);
	});

	context('LCHComponentDescriptorProps', function() {

		it('returns object if LCHComponentDescriptorProps not object', function() {
			deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
				LCHComponentDescriptorProps: null,
			})), {
				LCHComponentDescriptorProps: [
					'LCHErrorNotObject',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.LCHComponentDescriptorsErrors(Object.assign(kTesting.StubComponentDescriptorObjectValid(), {
				LCHComponentDescriptorProps: {},
			})), null);
		});

	});

});

describe('LCHRuntimeFilteredRecipes', function test_LCHRuntimeFilteredRecipes() {

	const uStubItem = function () {
		return {
			LCHRecipeCallback () {},
		};
	};	

	it('throws if param1 not array', function () {
		throws(function () {
			mod.LCHRuntimeFilteredRecipes(null, '');
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.LCHRuntimeFilteredRecipes([], null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.LCHRuntimeFilteredRecipes([], ''), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mod.LCHRuntimeFilteredRecipes([{}], ''), []);
	});

	it('includes if no LCHRecipeURLFilter', function() {
		const item = uStubItem();
		deepEqual(mod.LCHRuntimeFilteredRecipes([item], 'alfa'), [item]);
	});

	context('LCHRecipeURLFilter', function () {

		it('includes if wildcard', function() {
			const item = Object.assign(uStubItem(), {
				LCHRecipeURLFilter: '*',
			});

			deepEqual(mod.LCHRuntimeFilteredRecipes([item], 'alfa'), [item]);
		});

		it('excludes if param2 not match', function() {
			const item = Object.assign(uStubItem(), {
				LCHRecipeURLFilter: 'alfa',
			});
			
			deepEqual(mod.LCHRuntimeFilteredRecipes([item], 'bravo'), []);
		});
		
		it('includes if param2 match', function() {
			const item = Object.assign(uStubItem(), {
				LCHRecipeURLFilter: 'alfa',
			});
			
			deepEqual(mod.LCHRuntimeFilteredRecipes([item], 'alfa'), [item]);
		});
	
	});

});

describe('LCHRuntimeFilteredTasks', function test_LCHRuntimeFilteredTasks() {

	const uStubItem = function () {
		return {
			LCHRecipeCallback () {},
			LCHRecipeURLFilter: '*',
			LCHRecipeIsAutomatic: true,
		};
	};

	it('throws if not array', function () {
		throws(function () {
			mod.LCHRuntimeFilteredTasks(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.LCHRuntimeFilteredTasks([]), []);
	});

	it('excludes if not task', function() {
		deepEqual(mod.LCHRuntimeFilteredTasks([{
			LCHRecipeCallback () {},
		}], ''), []);
	});

	it('excludes if LCHRecipeIsExcluded', function() {
		deepEqual(mod.LCHRuntimeFilteredTasks([Object.assign(uStubItem(), {
			LCHRecipeIsExcluded () {
				return true;
			},
		})], ''), []);
	});

});

describe('LCHAPIRunTasks', function test_LCHAPIRunTasks() {

	const uStubItem = function () {
		return {
			LCHRecipeCallback () {
				return 'alfa';
			},
			LCHRecipeURLFilter: '*',
			LCHRecipeIsAutomatic: true,
		};
	};

	it('excludes if not matching', async function() {
		deepEqual(await mod.LCHAPIRunTasks([Object.assign(uStubItem(), {
			LCHRecipeURLFilter: 'bravo',
		})], 'charlie'), []);
	});

	it('runs callback', async function() {
		deepEqual(await mod.LCHAPIRunTasks([uStubItem()], '*'), ['alfa']);
	});

	it('binds standard api', async function() {
		deepEqual((await mod.LCHAPIRunTasks([Object.assign(uStubItem(), {
			LCHRecipeCallback () {
				return this.api.LCHDateLocalOffsetSubtracted(new Date());
			},
		})], '*')).pop() instanceof Date, true);
	});

	it('binds recipes api', async function() {
		deepEqual(await mod.LCHAPIRunTasks([Object.assign(uStubItem(), {
			LCHRecipeCallback () {
				return this.api.bravo();
			},
		}), {
			LCHRecipeSignature: 'bravo',
			LCHRecipeCallback () {
				return 'charlie';
			},
		}], '*'), ['charlie']);
	});

});

describe('LCHRecipeProxyErrors', function test_LCHRecipeProxyErrors() {

	it('returns object if not object', function() {
		deepEqual(mod.LCHRecipeProxyErrors(null), {});
	});

	it('returns object if LCHRecipeProxyName not function', function() {
		deepEqual(mod.LCHRecipeProxyErrors(Object.assign(kTesting.StubRecipeProxyObjectValid(), {
			LCHRecipeProxyName: null,
		})), {
			LCHRecipeProxyName: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns object if LCHRecipeProxySignature not function', function() {
		deepEqual(mod.LCHRecipeProxyErrors(Object.assign(kTesting.StubRecipeProxyObjectValid(), {
			LCHRecipeProxySignature: null,
		})), {
			LCHRecipeProxySignature: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.LCHRecipeProxyErrors(kTesting.StubRecipeProxyObjectValid()), null);
	});

});
