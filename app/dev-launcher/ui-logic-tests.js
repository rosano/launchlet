import { throws, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHLauncherModeCommit', function testLCHLauncherModeCommit() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModeCommit(), 'kLCHLauncherModeCommit');
	});

});

describe('LCHLauncherModePreview', function testLCHLauncherModePreview() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModePreview(), 'kLCHLauncherModePreview');
	});

});

describe('LCHLauncherModePipe', function testLCHLauncherModePipe() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModePipe(), 'kLCHLauncherModePipe');
	});

});

describe('LCHLauncherModeTask', function testLCHLauncherModeTask() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModeTask(), 'kLCHLauncherModeTask');
	});

});

describe('LCHLauncherModes', function testLCHLauncherModes() {

	it('returns array', function() {
		deepEqual(mainModule.LCHLauncherModes(), [
			mainModule.LCHLauncherModeCommit(),
			mainModule.LCHLauncherModePreview(),
			mainModule.LCHLauncherModePipe(),
			mainModule.LCHLauncherModeTask(),
		]);
	});

});

describe('LCHLauncherOptions', function testLCHLauncherOptions() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHLauncherOptions(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHLauncherOptions({}), 'object');
	});

	context('LCHOptionRecipes', function () {

		it('sets default if undefined', function() {
			deepEqual(mainModule.LCHLauncherOptions({}).LCHOptionRecipes, []);
		});

		it('throws error if not valid', function() {
			throws(function() {
				mainModule.LCHLauncherOptions({
					LCHOptionRecipes: null,
				});
			}, /LCHOptionRecipesNotArray/);
		});

		it('excludes if item not valid', function() {
			deepEqual(mainModule.LCHLauncherOptions({
				LCHOptionRecipes: [{}],
			}).LCHOptionRecipes, []);
		});

		it('passes input', function() {
			const item = {
				LCHRecipeCallback () {},
			};

			deepEqual(mainModule.LCHLauncherOptions({
				LCHOptionRecipes: [item],
			}).LCHOptionRecipes, [item]);
		});

	});

	context('LCHOptionMode', function () {

		it('sets default if undefined', function() {
			deepEqual(mainModule.LCHLauncherOptions({}).LCHOptionMode, mainModule.LCHLauncherModes().shift());
		});

		it('throws error if not valid', function() {
			throws(function() {
				mainModule.LCHLauncherOptions({
					LCHOptionMode: 'alfa',
				});
			}, /LCHOptionModeNotValid/);
		});

		it('passes input', function() {
			deepEqual(mainModule.LCHLauncherOptions({
				LCHOptionMode: mainModule.LCHLauncherModePreview(),
			}).LCHOptionMode, mainModule.LCHLauncherModePreview());
		});

	});

	context('LCHOptionCompletionHandler', function () {

		it('throws error if not function', function() {
			throws(function() {
				mainModule.LCHLauncherOptions({
					LCHOptionCompletionHandler: null,
				});
			}, /LCHOptionCompletionHandlerNotFunction/);
		});

		it('passes input', function() {
			const item = function () {};
			deepEqual(mainModule.LCHLauncherOptions({
				LCHOptionCompletionHandler: item,
			}).LCHOptionCompletionHandler, item);
		});

	});

	context('LCHOptionLanguage', function () {

		it('sets default if undefined', function() {
			deepEqual(mainModule.LCHLauncherOptions({}).LCHOptionLanguage, 'en');
		});

		it('throws error if not string', function() {
			throws(function() {
				mainModule.LCHLauncherOptions({
					LCHOptionLanguage: null,
				});
			}, /LCHOptionLanguageNotString/);
		});

		it('passes input', function() {
			deepEqual(mainModule.LCHLauncherOptions({
				LCHOptionLanguage: 'alfa'
			}).LCHOptionLanguage, 'alfa');
		});

	});

});

describe('LCHLauncherUIRecipesForMode', function testLCHLauncherUIRecipesForMode() {

	it('throws error if param1 not array', function() {
		throws(function() {
			mainModule.LCHLauncherUIRecipesForMode(null, mainModule.LCHLauncherModeCommit());
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not valid', function() {
		throws(function() {
			mainModule.LCHLauncherUIRecipesForMode([], 'alfa');
		}, /LCHErrorInputNotValid/);
	});

	it('excludes if not object', function() {
		deepEqual(mainModule.LCHLauncherUIRecipesForMode([null], mainModule.LCHLauncherModeCommit()), []);
	});

	it.skip('excludes if multiple LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHLauncherUIRecipesForMode([{
			LCHRecipeInputTypes: 'alfa,bravo',
		}], mainModule.LCHLauncherModeCommit()), []);
	});

	it('excludes if more than two LCHRecipeInputTypes', function() {
		deepEqual(mainModule.LCHLauncherUIRecipesForMode([{
			LCHRecipeInputTypes: 'alfa,bravo,charlie',
		}], mainModule.LCHLauncherModeCommit()), []);
	});

	context('LCHLauncherModeCommit', function() {

		it('excludes all', function() {
			deepEqual(mainModule.LCHLauncherUIRecipesForMode([{
				LCHRecipeCallback () {},
			}], mainModule.LCHLauncherModeCommit()), []);
		});

		it('includes if Command', function() {
			let item = {
				LCHRecipeName: 'alfa',
				LCHRecipeCallback () {},
			};
			deepEqual(mainModule.LCHLauncherUIRecipesForMode([item], mainModule.LCHLauncherModeCommit()), [item]);
		});

		context.skip('if Action', function() {

			it('excludes if multiple LCHRecipeInputTypes', function() {
				deepEqual(mainModule.LCHLauncherUIRecipesForMode([{
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'String,String',
					_LCHLauncherGenerated: true,
					LCHRecipeCallback (bravo, charlie) {},
				}], mainModule.LCHLauncherModeCommit()), []);
			});

			it('excludes if LCHRecipeInputTypes not String', function() {
				deepEqual(mainModule.LCHLauncherUIRecipesForMode([{
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'bravo',
					_LCHLauncherGenerated: true,
					LCHRecipeCallback (charlie) {},
				}], mainModule.LCHLauncherModeCommit()), []);
			});

			it('excludes if _LCHLauncherGenerated not true', function() {
				deepEqual(mainModule.LCHLauncherUIRecipesForMode([{
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'String',
					_LCHLauncherGenerated: 'bravo',
					LCHRecipeCallback (charlie) {},
				}], mainModule.LCHLauncherModeCommit()), []);
			});

			it('includes', function() {
				let item = {
					LCHRecipeName: 'alfa',
					LCHRecipeInputTypes: 'String',
					_LCHLauncherGenerated: true,
					LCHRecipeCallback (bravo) {},
				};
				deepEqual(mainModule.LCHLauncherUIRecipesForMode([item], mainModule.LCHLauncherModeCommit()), [item]);
			});

		});

	});

	context('LCHLauncherModePreview', function() {

		it('excludes all', function() {
			deepEqual(mainModule.LCHLauncherUIRecipesForMode([{
				LCHRecipeCallback () {},
			}], mainModule.LCHLauncherModePreview()), []);
		});

		it('includes if Command', function() {
			let item = {
				LCHRecipeName: 'alfa',
				LCHRecipeCallback () {},
			};
			deepEqual(mainModule.LCHLauncherUIRecipesForMode([item], mainModule.LCHLauncherModePreview()), [item]);
		});

	});

});

// describe('LCHLauncherFilterForText', function testLCHLauncherFilterForText() {

// 	it('throws error if not string', function() {
// 		throws(function() {
// 			mainModule.LCHLauncherFilterForText(null);
// 		}, /LCHErrorInputNotValid/);
// 	});

// 	it('returns function', function() {
// 		deepEqual(typeof mainModule.LCHLauncherFilterForText('alfa'), 'function');
// 	});

// 	context('function', function () {

// 		it('returns false if LCHRecipeSignature match', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeSignature: 'alfa',
// 			}), false);
// 		});

// 		it('returns false if LCHRecipeCallback match', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeCallback () {
// 					return 'alfa';
// 				},
// 			}), false);
// 		});

// 		it('returns true if match LCHRecipeName', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('returns false if no match', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
// 				LCHRecipeName: 'bravo',
// 			}), false);
// 		});

// 		it('matches partial head', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('alf')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches partial tail', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('lfa')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches partial body', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('lf')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches partial multi', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('af')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 		it('matches alternate case', function() {
// 			deepEqual(mainModule.LCHLauncherFilterForText('ALF')({
// 				LCHRecipeName: 'alfa',
// 			}), true);
// 		});

// 	});

// });

describe('LCHLauncherKeyboardEventIsTextInput', function testLCHLauncherKeyboardEventIsTextInput() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHLauncherKeyboardEventIsTextInput(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if metaKey true', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			metaKey: true,
		}), false);
	});

	it('returns false if shiftKey true', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			shiftKey: true,
		}), false);
	});

	it('returns false if ctrlKey true', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			ctrlKey: true,
		}), false);
	});

	it('returns false if altKey true', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			metaKey: true,
		}), false);
	});

	it('returns false if no key', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({}), false);
	});

	it('returns false if key Unidentified', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'Unidentified',
		}), false);
	});

	it('returns false if key Tab', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'Tab',
		}), false);
	});

	it('returns false if key CapsLock', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'CapsLock',
		}), false);
	});

	it('returns false if key ArrowRight', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'ArrowRight',
		}), false);
	});

	it('returns false if key ArrowLeft', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'ArrowLeft',
		}), false);
	});

	it('returns false if key Backspace', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'Backspace',
		}), false);
	});

	it('returns false if key \\', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: '\\',
		}), false);
	});

	it('returns false if key .', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: '.',
		}), false);
	});

	it('returns false if key ,', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: ',',
		}), false);
	});

	it('returns false if key Space', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: ' ',
		}), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'a',
		}), true);
	});

	it('includes if not latin', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: 'ا',
		}), true);
	});

	it('includes if not alphanumeric', function() {
		deepEqual(mainModule.LCHLauncherKeyboardEventIsTextInput({
			key: '[',
		}), true);
	});

});

describe('LCHLauncherActionComparator', function testLCHLauncherActionComparator() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHLauncherActionComparator(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mainModule.LCHLauncherActionComparator(''), 'function');
	});

	context('function', function () {

		it('does nothing if no match', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'bravo'},
			];
			deepEqual(items.slice().sort(mainModule.LCHLauncherActionComparator('')), items);
		});

		it('does nothing if matches second param', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'bravo,charlie'},
			];
			deepEqual(items.slice().sort(mainModule.LCHLauncherActionComparator('charlie')), items);
		});

		it('ranks higher if match first param', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'bravo,charlie'},
			];
			deepEqual(items.slice().sort(mainModule.LCHLauncherActionComparator('bravo')), items.slice().reverse());
		});

		it('ranks higher if single param', function() {
			const items = [
				{ LCHRecipeInputTypes: 'alfa'},
				{ LCHRecipeInputTypes: 'alfa, bravo'},
				{ LCHRecipeInputTypes: 'alfa'},
			];
			deepEqual(items.slice().sort(mainModule.LCHLauncherActionComparator('alfa')), [items[0], items[2], items[1]]);
		});

	});

});

describe('LCHLauncherConstrainIndex', function testLCHLauncherConstrainIndex() {

	it('throws error if param1 not array', function() {
		throws(function() {
			mainModule.LCHLauncherConstrainIndex(null, 0);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not number', function() {
		throws(function() {
			mainModule.LCHLauncherConstrainIndex([], null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns last if param2 below 0', function() {
		deepEqual(mainModule.LCHLauncherConstrainIndex(['alfa', 'bravo', 'charlie'], -1), 2);
	});

	it('returns first if param2 above length', function() {
		deepEqual(mainModule.LCHLauncherConstrainIndex(['alfa', 'bravo', 'charlie'], 3), 0);
	});

	it('returns param2', function() {
		deepEqual(mainModule.LCHLauncherConstrainIndex([], 0), 0);
	});

});

describe('LCHLauncherReloadableSubjects', function testLCHLauncherReloadableSubjects() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule.LCHLauncherReloadableSubjects(null, 0);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHLauncherReloadableSubjects([]), []);
	});

	it('excludes if undefined', function() {
		deepEqual(mainModule.LCHLauncherReloadableSubjects([undefined]), []);
	});

	it('excludes if null', function() {
		deepEqual(mainModule.LCHLauncherReloadableSubjects([null]), []);
	});

	it('excludes if string', function() {
		deepEqual(mainModule.LCHLauncherReloadableSubjects(['alfa']), []);
	});

	it('excludes if not valid', function() {
		deepEqual(mainModule.LCHLauncherReloadableSubjects([{}]), []);
	});

	it('excludes if not subject', function() {
		deepEqual(mainModule.LCHLauncherReloadableSubjects([{
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
		deepEqual(mainModule.LCHLauncherReloadableSubjects([item]), [item]);
	});

	it('flattens nested arrays', function() {
		const item = {
			LCHRecipeName: 'alfa',
			LCHRecipeCallback () {},
			LCHRecipeOutputType: 'bravo',
		};
		deepEqual(mainModule.LCHLauncherReloadableSubjects([[item]]), [item]);
	});

});
