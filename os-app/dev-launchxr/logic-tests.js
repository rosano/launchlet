const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js').default;

const fuzzysortPackage = require('fuzzysort');

describe('LCHLauncherModeCommand', function test_LCHLauncherModeCommand() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModeCommand(), 'kLCHLauncherModeCommand');
	});

});

describe('LCHLauncherModePreview', function test_LCHLauncherModePreview() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModePreview(), 'kLCHLauncherModePreview');
	});

});

describe('LCHLauncherModePipe', function test_LCHLauncherModePipe() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModePipe(), 'kLCHLauncherModePipe');
	});

});

describe('LCHLauncherModeTask', function test_LCHLauncherModeTask() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherModeTask(), 'kLCHLauncherModeTask');
	});

});

describe('LCHLauncherModes', function test_LCHLauncherModes() {

	it('returns array', function() {
		deepEqual(mainModule.LCHLauncherModes(), [
			mainModule.LCHLauncherModeCommand(),
			mainModule.LCHLauncherModePreview(),
			mainModule.LCHLauncherModePipe(),
			mainModule.LCHLauncherModeTask(),
		]);
	});

});

describe('LCHLauncherFilterFunction', function test_LCHLauncherFilterFunction() {

	it('throws error if param1 not fuzzysort', function() {
		throws(function() {
			mainModule.LCHLauncherFilterFunction({
				go: null,
			}, '', []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHLauncherFilterFunction(fuzzysortPackage, null, []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param3 not array', function() {
		throws(function() {
			mainModule.LCHLauncherFilterFunction(fuzzysortPackage, '', null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHLauncherFilterFunction(fuzzysortPackage, 'alfa', []), []);
	});

	it('excludes if no match', function() {
		deepEqual(mainModule.LCHLauncherFilterFunction(fuzzysortPackage, 'bravo', [{
			LCHRecipeName: 'alfa',
		}]), []);
	});

	it('includes if full match', function() {
		const item = {
			LCHRecipeName: 'alfa',
		};
		deepEqual(mainModule.LCHLauncherFilterFunction(fuzzysortPackage, 'alfa', [item]), [item]);
	});

	it('includes if partial match', function() {
		const item = {
			LCHRecipeName: 'alfa',
		};
		deepEqual(mainModule.LCHLauncherFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

	it('includes if case insensitive match', function() {
		const item = {
			LCHRecipeName: 'ALFA',
		};
		deepEqual(mainModule.LCHLauncherFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

	it('includes if diacritic insensitive match', function() {
		const item = {
			LCHRecipeName: 'álfa',
		};
		deepEqual(mainModule.LCHLauncherFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

});
