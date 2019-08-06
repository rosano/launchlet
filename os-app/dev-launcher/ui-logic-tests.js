import { throws, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHLauncherModeDefault', function testLCHLauncherModeDefault() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModeDefault(), 'default');
	});

});

describe('LCHLauncherModeJump', function testLCHLauncherModeJump() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModeJump(), 'jump');
	});

});

describe('LCHLauncherModePipe', function testLCHLauncherModePipe() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModePipe(), 'Pipe');
	});

});

describe('LCHLauncherModes', function testLCHLauncherModes() {

	it('returns array', function() {
		deepEqual(mainModule.LCHLauncherModes(), [
			mainModule.LCHLauncherModeDefault(),
			mainModule.LCHLauncherModeJump(),
			mainModule.LCHLauncherModePipe(),
		]);
	});

});

describe('LCHLauncherOptions', function testLCHLauncherOptions() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHLauncherFilterForText(null);
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

describe('LCHLauncherFilterForText', function testLCHLauncherFilterForText() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHLauncherFilterForText(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHLauncherFilterForText('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if LCHRecipeSignature match', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
				LCHRecipeSignature: 'alfa',
			}), false);
		});

		it('returns false if LCHRecipeCallback match', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
				LCHRecipeCallback () {
					return 'alfa';
				},
			}), false);
		});
		
		it('returns true if match LCHRecipeTitle', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('returns false if no match', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('alfa')({
				LCHRecipeTitle: 'bravo',
			}), false);
		});

		it('matches partial head', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('alf')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches partial tail', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('lfa')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches partial body', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('lf')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches partial multi', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('af')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});

		it('matches alternate case', function() {
			deepEqual(mainModule.LCHLauncherFilterForText('ALF')({
				LCHRecipeTitle: 'alfa',
			}), true);
		});
		
	});

});

describe('LCHLauncherConstrainIndex', function testLCHLauncherConstrainIndex() {

	it('throws error if param1 not array', function() {
		throws(function() {
			mainModule.LCHLauncherConstrainIndex(null, 0);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not number', function() {
		throws(function() {
			mainModule.LCHLauncherConstrainIndex([], null);
		}, /LCHErrorInputInvalid/);
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

describe('LCHLauncherPatternMatchesURL', function testLCHLauncherPatternMatchesURL() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHLauncherPatternMatchesURL(null, '');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHLauncherPatternMatchesURL('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not filled', function() {
		throws(function() {
			mainModule.LCHLauncherPatternMatchesURL('', '');
		}, /LCHErrorInputInvalid/);
	});

	it('returns true if param1 empty', function() {
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('', 'alfa'), true);
	});


	it('returns false if no match', function() {
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('bravo', 'alfa'), false);
	});

	it('returns true if match', function() {
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('alfa', 'alfa'), true);
	});

	it('matches as string', function() {
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('al', 'alfa'), true);
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('br', 'alfa'), false);
	});

	it('matches as regex', function() {
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('/\\w/', 'alfa'), true);
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('/\\d/', 'alfa'), false);
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('/A/', 'alfa'), false);
		deepEqual(mainModule.LCHLauncherPatternMatchesURL('/A/i', 'alfa'), true);
	});

});
