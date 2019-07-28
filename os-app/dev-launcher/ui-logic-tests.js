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
			mainModule.LCHLauncherLogicFilter(null);
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

describe('LCHLauncherLogicFilter', function testLCHLauncherLogicFilter() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHLauncherLogicFilter(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHLauncherLogicFilter('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if match id', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('alfa')({
				id: 'alfa',
			}), false);
		});

		it('returns false if match fn', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('alfa')({
				fn: function () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match name', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('alfa')({
				name: 'bravo',
			}), false);
		});

		it('returns false if no match labels', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('alfa')({
				labels: [
					'bravo',
				],
			}), false);
		});

		it('returns true if match name', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('alfa')({
				name: 'alfa',
			}), true);
		});

		it('returns true if match labels', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('alfa')({
				labels: [
					'alfa',
				],
			}), true);
		});

		it('returns true if match partial', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('alf')({
				name: 'alfa',
			}), true);
		});

		it('returns true if alternate case', function() {
			deepEqual(mainModule.LCHLauncherLogicFilter('ALF')({
				name: 'alfa',
			}), true);
		});
		
	});

});
