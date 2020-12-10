const { throws, deepEqual } = require('assert');

const mod = require('./logic.js').default;

const fuzzysortPackage = require('fuzzysort');

describe('LCHLauncherModeCommand', function test_LCHLauncherModeCommand() {

	it('returns string', function() {
		deepEqual(mod.LCHLauncherModeCommand(), 'kLCHLauncherModeCommand');
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
			mod.LCHLauncherModeCommand(),
			mod.LCHLauncherModePreview(),
			mod.LCHLauncherModePipe(),
			mod.LCHLauncherModeTask(),
		]);
	});

});

describe('LCHLauncherFilterFunction', function test_LCHLauncherFilterFunction() {

	it('throws error if param1 not fuzzysort', function() {
		throws(function() {
			mod.LCHLauncherFilterFunction({
				go: null,
			}, '', []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.LCHLauncherFilterFunction(fuzzysortPackage, null, []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param3 not array', function() {
		throws(function() {
			mod.LCHLauncherFilterFunction(fuzzysortPackage, '', null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod.LCHLauncherFilterFunction(fuzzysortPackage, 'alfa', []), []);
	});

	it('excludes if no match', function() {
		deepEqual(mod.LCHLauncherFilterFunction(fuzzysortPackage, 'bravo', [{
			LCHRecipeName: 'alfa',
		}]), []);
	});

	it('includes if full match', function() {
		const item = {
			LCHRecipeName: 'alfa',
		};
		deepEqual(mod.LCHLauncherFilterFunction(fuzzysortPackage, 'alfa', [item]), [item]);
	});

	it('includes if partial match', function() {
		const item = {
			LCHRecipeName: 'alfa',
		};
		deepEqual(mod.LCHLauncherFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

	it('includes if case insensitive match', function() {
		const item = {
			LCHRecipeName: 'ALFA',
		};
		deepEqual(mod.LCHLauncherFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

	it('includes if diacritic insensitive match', function() {
		const item = {
			LCHRecipeName: 'álfa',
		};
		deepEqual(mod.LCHLauncherFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

});
