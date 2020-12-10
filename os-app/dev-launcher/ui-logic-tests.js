const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('LCHLauncherModeCommit', function test_LCHLauncherModeCommit() {

	it('returns string', function() {
		deepEqual(mod.LCHLauncherModeCommit(), 'kLCHLauncherModeCommit');
	});

});

describe('LCHLauncherModePreview', function test_LCHLauncherModePreview() {

	it('returns string', function() {
		deepEqual(mod.LCHLauncherModePreview(), 'kLCHLauncherModePreview');
	});

});

describe('LCHLauncherModePipe', function test_LCHLauncherModePipe() {

	it('returns string', function() {
		deepEqual(mod.LCHLauncherModePipe(), 'kLCHLauncherModePipe');
	});

});

describe('LCHLauncherModeTask', function test_LCHLauncherModeTask() {

	it('returns string', function() {
		deepEqual(mod.LCHLauncherModeTask(), 'kLCHLauncherModeTask');
	});

});

describe('LCHLauncherModes', function test_LCHLauncherModes() {

	it('returns array', function() {
		deepEqual(mod.LCHLauncherModes(), [
			mod.LCHLauncherModeCommit(),
			mod.LCHLauncherModePreview(),
			mod.LCHLauncherModePipe(),
			mod.LCHLauncherModeTask(),
		]);
	});

});

describe('LCHLauncherOptions', function test_LCHLauncherOptions() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHLauncherOptions(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(typeof mod.LCHLauncherOptions({}), 'object');
	});

	context('LCHOptionRecipes', function () {

		it('sets default if undefined', function() {
			deepEqual(mod.LCHLauncherOptions({}).LCHOptionRecipes, []);
		});
		
		it('throws error if not valid', function() {
			throws(function() {
				mod.LCHLauncherOptions({
					LCHOptionRecipes: null,
				});
			}, /LCHOptionRecipesNotArray/);
		});

		it('excludes if item not valid', function() {
			deepEqual(mod.LCHLauncherOptions({
				LCHOptionRecipes: [{}],
			}).LCHOptionRecipes, []);
		});
		
		it('passes input', function() {
			const item = {
				LCHRecipeCallback () {},
			};
			
			deepEqual(mod.LCHLauncherOptions({
				LCHOptionRecipes: [item],
			}).LCHOptionRecipes, [item]);
		});

	});

	context('LCHOptionMode', function () {

		it('sets default if undefined', function() {
			deepEqual(mod.LCHLauncherOptions({}).LCHOptionMode, mod.LCHLauncherModes().shift());
		});
		
		it('throws error if not valid', function() {
			throws(function() {
				mod.LCHLauncherOptions({
					LCHOptionMode: 'alfa',
				});
			}, /LCHOptionModeNotValid/);
		});

		it('passes input', function() {
			deepEqual(mod.LCHLauncherOptions({
				LCHOptionMode: mod.LCHLauncherModePreview(),
			}).LCHOptionMode, mod.LCHLauncherModePreview());
		});

	});

	context('LCHOptionCompletionHandler', function () {

		it('throws error if not function', function() {
			throws(function() {
				mod.LCHLauncherOptions({
					LCHOptionCompletionHandler: null,
				});
			}, /LCHOptionCompletionHandlerNotFunction/);
		});

		it('passes input', function() {
			const item = function () {};
			deepEqual(mod.LCHLauncherOptions({
				LCHOptionCompletionHandler: item,
			}).LCHOptionCompletionHandler, item);
		});

	});

	context('LCHOptionLanguage', function () {

		it('sets default if undefined', function() {
			deepEqual(mod.LCHLauncherOptions({}).LCHOptionLanguage, 'en');
		});

		it('throws error if not string', function() {
			throws(function() {
				mod.LCHLauncherOptions({
					LCHOptionLanguage: null,
				});
			}, /LCHOptionLanguageNotString/);
		});
		
		it('passes input', function() {
			deepEqual(mod.LCHLauncherOptions({
				LCHOptionLanguage: 'alfa'
			}).LCHOptionLanguage, 'alfa');
		});

	});

});

describe('LCHLauncherUIRecipesForMode', function test_LCHLauncherUIRecipesForMode() {

	it('throws error if param1 not array', function() {
		throws(function() {
			mod.LCHLauncherUIRecipesForMode(null, mod.LCHLauncherModeCommit());
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not valid', function() {
		throws(function() {
			mod.LCHLauncherUIRecipesForMode([], 'alfa');
		}, /LCHErrorInputNotValid/);
	});

	it('excludes if not object', function() {
		deepEqual(mod.LCHLauncherUIRecipesForMode([null], mod.LCHLauncherModeCommit()), []);
	});

	it.skip('excludes if multiple LCHRecipeInputTypes', function() {
		deepEqual(mod.LCHLauncherUIRecipesForMode([{
			LCHRecipeInputTypes: 'alfa,bravo',
		}], mod.LCHLauncherModeCommit()), []);
	});

	it('excludes if more than two LCHRecipeInputTypes', function() {
		deepEqual(mod.LCHLauncherUIRecipesForMode([{
			LCHRecipeInputTypes: 'alfa,bravo,charlie',
		}], mod.LCHLauncherModeCommit()), []);
	});

	context('LCHLauncherModeCommit', function() {

		it('excludes all', function() {
			deepEqual(mod.LCHLauncherUIRecipesForMode([{
				LCHRecipeCallback () {},
			}], mod.LCHLauncherModeCommit()), []);
		});

		it('includes if Command', function() {
			let item = {
				LCHRecipeName: 'alfa',
				LCHRecipeCallback () {},
			};
			deepEqual(mod.LCHLauncherUIRecipesForMode([item], mod.LCHLauncherModeCommit()), [item]);
		});

		context.skip('if Action', function() {
			
			it('excludes if multiple LCHRecipeInputTypes', function() {
				deepEqual(mod.LCHLauncherUIRecipesForMode([{
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'String,String',
					_LCHLauncherGenerated: true,
					LCHRecipeCallback (bravo, charlie) {},
				}], mod.LCHLauncherModeCommit()), []);
			});
			
			it('excludes if LCHRecipeInputTypes not String', function() {
				deepEqual(mod.LCHLauncherUIRecipesForMode([{
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'bravo',
					_LCHLauncherGenerated: true,
					LCHRecipeCallback (charlie) {},
				}], mod.LCHLauncherModeCommit()), []);
			});
			
			it('excludes if _LCHLauncherGenerated not true', function() {
				deepEqual(mod.LCHLauncherUIRecipesForMode([{
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'String',
					_LCHLauncherGenerated: 'bravo',
					LCHRecipeCallback (charlie) {},
				}], mod.LCHLauncherModeCommit()), []);
			});

			it('includes', function() {
				let item = {
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'String',
					_LCHLauncherGenerated: true,
					LCHRecipeCallback (bravo) {},
				};
				deepEqual(mod.LCHLauncherUIRecipesForMode([item], mod.LCHLauncherModeCommit()), [item]);
			});

		});

	});

	context('LCHLauncherModePreview', function() {

		it('excludes all', function() {
			deepEqual(mod.LCHLauncherUIRecipesForMode([{
				LCHRecipeCallback () {},
			}], mod.LCHLauncherModePreview()), []);
		});

		it('includes if Command', function() {
			let item = {
				LCHRecipeName: 'alfa',
				LCHRecipeCallback () {},
			};
			deepEqual(mod.LCHLauncherUIRecipesForMode([item], mod.LCHLauncherModePreview()), [item]);
		});

	});

});

// describe('LCHLauncherFilterForText', function test_LCHLauncherFilterForText() {

// 	it('throws error if not string', function() {
// 		throws(function() {
// 			mod.LCHLauncherFilterForText(null);
// 		}, /LCHErrorInputNotValid/);
// 	});

// 	it('returns function', function() {
// 		deepEqual(typeof mod.LCHLauncherFilterForText('alfa'), 'function');
// 	});

// 	context('function', function () {

// 		it('returns false if LCHRecipeSignature match', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeSignature: 'alfa',
// 			}), false);
// 		});

// 		it('returns false if LCHRecipeCallback match', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeCallback () {
// 					return 'alfa';
// 				},
// 			}), false);
// 		});
		
// 		it('returns true if match LCHRecipeName', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('returns false if no match', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeName: 'bravo',
// 			}), false);
// 		});

// 		it('matches partial head', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('alf')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches partial tail', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('lfa')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches partial body', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('lf')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches partial multi', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('af')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches alternate case', function() {
// 			deepEqual(mod.LCHLauncherFilterForText('ALF')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});
		
// 	});

// });

describe('LCHLauncherKeyboardEventIsTextInput', function test_LCHLauncherKeyboardEventIsTextInput() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHLauncherKeyboardEventIsTextInput(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if metaKey true', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			metaKey: true,
		}), false);
	});

	it('returns false if shiftKey true', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			shiftKey: true,
		}), false);
	});

	it('returns false if ctrlKey true', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			ctrlKey: true,
		}), false);
	});

	it('returns false if altKey true', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			metaKey: true,
		}), false);
	});

	it('returns false if no key', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({}), false);
	});

	it('returns false if key Unidentified', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'Unidentified',
		}), false);
	});

	it('returns false if key Tab', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'Tab',
		}), false);
	});

	it('returns false if key CapsLock', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'CapsLock',
		}), false);
	});

	it('returns false if key ArrowRight', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'ArrowRight',
		}), false);
	});

	it('returns false if key ArrowLeft', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'ArrowLeft',
		}), false);
	});

	it('returns false if key Backspace', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'Backspace',
		}), false);
	});

	it('returns false if key \\', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: '\\',
		}), false);
	});

	it('returns false if key .', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: '.',
		}), false);
	});

	it('returns false if key ,', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: ',',
		}), false);
	});

	it('returns false if key Space', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: ' ',
		}), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'a',
		}), true);
	});

	it('includes if not latin', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: 'ا',
		}), true);
	});

	it('includes if not alphanumeric', function() {
		deepEqual(mod.LCHLauncherKeyboardEventIsTextInput({
			key: '[',
		}), true);
	});

});

describe('LCHLauncherActionComparator', function test_LCHLauncherActionComparator() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHLauncherActionComparator(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mod.LCHLauncherActionComparator(''), 'function');
	});

	context('function', function () {

		it('does nothing if no match', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'bravo'},
			];
			deepEqual(items.slice().sort(mod.LCHLauncherActionComparator('')), items);
		});

		it('does nothing if matches second param', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'bravo,charlie'},
			];
			deepEqual(items.slice().sort(mod.LCHLauncherActionComparator('charlie')), items);
		});

		it('ranks higher if match first param', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'bravo,charlie'},
			];
			deepEqual(items.slice().sort(mod.LCHLauncherActionComparator('bravo')), items.slice().reverse());
		});

		it('ranks higher if single param', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'alfa, bravo'},
				{ LCHRecipeInputTypes: 'alfa'},
			];
			deepEqual(items.slice().sort(mod.LCHLauncherActionComparator('alfa')), [items[0], items[2], items[1]]);
		});
	
	});

});

describe('LCHLauncherConstrainIndex', function test_LCHLauncherConstrainIndex() {

	it('throws error if param1 not array', function() {
		throws(function() {
			mod.LCHLauncherConstrainIndex(null, 0);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not number', function() {
		throws(function() {
			mod.LCHLauncherConstrainIndex([], null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns last if param2 below 0', function() {
		deepEqual(mod.LCHLauncherConstrainIndex(['alfa', 'bravo', 'charlie'], -1), 2);
	});

	it('returns first if param2 above length', function() {
		deepEqual(mod.LCHLauncherConstrainIndex(['alfa', 'bravo', 'charlie'], 3), 0);
	});

	it('returns param2', function() {
		deepEqual(mod.LCHLauncherConstrainIndex([], 0), 0);
	});

});

describe('LCHLauncherReloadableSubjects', function test_LCHLauncherReloadableSubjects() {

	it('throws error if not array', function() {
		throws(function() {
			mod.LCHLauncherReloadableSubjects(null, 0);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod.LCHLauncherReloadableSubjects([]), []);
	});

	it('excludes if undefined', function() {
		deepEqual(mod.LCHLauncherReloadableSubjects([undefined]), []);
	});

	it('excludes if null', function() {
		deepEqual(mod.LCHLauncherReloadableSubjects([null]), []);
	});

	it('excludes if string', function() {
		deepEqual(mod.LCHLauncherReloadableSubjects(['alfa']), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mod.LCHLauncherReloadableSubjects([{}]), []);
	});

	it('excludes if not subject', function() {
		deepEqual(mod.LCHLauncherReloadableSubjects([{
			LCHRecipeName: 'alfa',
			LCHRecipeCallback () {},
		}]), []);
	});

	it('includes', function() {
		const item = {
			LCHRecipeName: 'alfa',
			LCHRecipeCallback () {},
			LCHRecipeOutputType: 'bravo',
		};
		deepEqual(mod.LCHLauncherReloadableSubjects([item]), [item]);
	});

	it('flattens nested arrays', function() {
		const item = {
			LCHRecipeName: 'alfa',
			LCHRecipeCallback () {},
			LCHRecipeOutputType: 'bravo',
		};
		deepEqual(mod.LCHLauncherReloadableSubjects([[item]]), [item]);
	});

});
