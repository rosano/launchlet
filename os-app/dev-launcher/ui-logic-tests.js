import { throws, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHLauncherModes', function testLCHLauncherModes() {

	it('returns array', function() {
		deepEqual(mainModule.LCHLauncherModes(), [
			mainModule.LCHLauncherModeDefault,
			mainModule.LCHLauncherModeJump,
			]);
	});

});

describe('LCHLauncherOptions', function testLCHLauncherOptions() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHLauncherLogicFilterFor(null);
		}, /LCHErrorInputInvalid/);
	});

	context('languageCode', function () {

		it('returns en', function() {
			deepEqual(mainModule.LCHLauncherOptions({}).languageCode, 'en');
		});

		it('returns inputData', function() {
			deepEqual(mainModule.LCHLauncherOptions({
				languageCode: 'alfa'
			}).languageCode, 'alfa');
		});
		
	});

	context('runMode', function () {

		it('returns en', function() {
			deepEqual(mainModule.LCHLauncherOptions({}).runMode, 'default');
		});

		it('ignores if not valid', function() {
			deepEqual(mainModule.LCHLauncherOptions({
				runMode: 'alfa'
			}).runMode, 'default');
		});

		it('returns inputData', function() {
			deepEqual(mainModule.LCHLauncherOptions({
				runMode: 'jump'
			}).runMode, 'jump');
		});
		
	});

});

describe('LCHLauncherLogicFilterFor', function testLCHLauncherLogicFilterFor() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHLauncherLogicFilterFor(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHLauncherLogicFilterFor('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if LCHRecipeSignature match', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('alfa')({
				LCHRecipeSignature: 'alfa',
			}), false);
		});

		it('returns false if LCHRecipeCallback match', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('alfa')({
				LCHRecipeCallback () {
					return 'alfa';
				},
			}), false);
		});
		
		it('returns true if match LCHRecipeTitle', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('alfa')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('returns false if no match', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('alfa')({
				LCHRecipeTitle: 'bravo',
			}), false);
		});

		it('matches partial head', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('alf')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches partial tail', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('lfa')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches partial body', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('lf')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches partial multi', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('af')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches alternate case', function() {
			deepEqual(mainModule.LCHLauncherLogicFilterFor('ALF')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});
		
	});

});

describe('LCHLauncherLogicConstrainIndex', function testLCHLauncherLogicConstrainIndex() {

	it('throws error if param1 not array', function() {
		throws(function() {
			mainModule.LCHLauncherLogicConstrainIndex(null, 0);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not number', function() {
		throws(function() {
			mainModule.LCHLauncherLogicConstrainIndex([], null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns last if param2 below 0', function() {
		deepEqual(mainModule.LCHLauncherLogicConstrainIndex(['alfa', 'bravo', 'charlie'], -1), 2);
	});

	it('returns first if param2 above length', function() {
		deepEqual(mainModule.LCHLauncherLogicConstrainIndex(['alfa', 'bravo', 'charlie'], 3), 0);
	});

	it('returns param2', function() {
		deepEqual(mainModule.LCHLauncherLogicConstrainIndex([], 0), 0);
	});

});

describe('LCHLauncherRecipes', function testLCHLauncherRecipes() {

	it('returns LCHFormulaObject for each folder', function() {
		deepEqual(mainModule.LCHLauncherRecipes(), [].concat.apply([], require('glob').sync('*main.js', {
		  matchBase: true,
		  cwd: require('path').join(__dirname, 'formulas'),
		}).map(function (e) {
			return Object.entries(require(require('path').join(__dirname, 'formulas', e))).map(function (e) {
				return {
					LCHRecipeSignature: e.shift(),
					LCHRecipeCallback: e.pop(),
				};
			});
		})));
	});

});

describe('LCHLauncherLogicPatternMatchesURL', function testLCHLauncherLogicPatternMatchesURL() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHLauncherLogicPatternMatchesURL(null, '');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHLauncherLogicPatternMatchesURL('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not filled', function() {
		throws(function() {
			mainModule.LCHLauncherLogicPatternMatchesURL('', '');
		}, /LCHErrorInputInvalid/);
	});

	it('returns true if param1 empty', function() {
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('', 'alfa'), true);
	});


	it('returns false if no match', function() {
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('bravo', 'alfa'), false);
	});

	it('returns true if match', function() {
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('alfa', 'alfa'), true);
	});

	it('matches as string', function() {
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('al', 'alfa'), true);
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('br', 'alfa'), false);
	});

	it('matches as regex', function() {
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('/\\w/', 'alfa'), true);
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('/\\d/', 'alfa'), false);
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('/A/', 'alfa'), false);
		deepEqual(mainModule.LCHLauncherLogicPatternMatchesURL('/A/i', 'alfa'), true);
	});

});
