const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js').default;

const fuzzysortPackage = require('fuzzysort');

describe('LCHLaunchxrModeCommand', function test_LCHLaunchxrModeCommand() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLaunchxrModeCommand(), 'kLCHLaunchxrModeCommand');
	});

});

describe('LCHLaunchxrModePreview', function test_LCHLaunchxrModePreview() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLaunchxrModePreview(), 'kLCHLaunchxrModePreview');
	});

});

describe('LCHLaunchxrModePipe', function test_LCHLaunchxrModePipe() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLaunchxrModePipe(), 'kLCHLaunchxrModePipe');
	});

});

describe('LCHLaunchxrModeTask', function test_LCHLaunchxrModeTask() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLaunchxrModeTask(), 'kLCHLaunchxrModeTask');
	});

});

describe('LCHLaunchxrModes', function test_LCHLaunchxrModes() {

	it('returns array', function() {
		deepEqual(mainModule.LCHLaunchxrModes(), [
			mainModule.LCHLaunchxrModeCommand(),
			mainModule.LCHLaunchxrModePreview(),
			mainModule.LCHLaunchxrModePipe(),
			mainModule.LCHLaunchxrModeTask(),
		]);
	});

});

describe('LCHLaunchxrFilterFunction', function test_LCHLaunchxrFilterFunction() {

	it('throws error if param1 not fuzzysort', function() {
		throws(function() {
			mainModule.LCHLaunchxrFilterFunction({
				go: null,
			}, '', []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, null, []);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param3 not array', function() {
		throws(function() {
			mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, '', null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, 'alfa', []), []);
	});

	it('excludes if no match', function() {
		deepEqual(mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, 'bravo', [{
			LCHRecipeName: 'alfa',
		}]), []);
	});

	it('includes if full match', function() {
		const item = {
			LCHRecipeName: 'alfa',
		};
		deepEqual(mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, 'alfa', [item]), [item]);
	});

	it('includes if partial match', function() {
		const item = {
			LCHRecipeName: 'alfa',
		};
		deepEqual(mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

	it('includes if case insensitive match', function() {
		const item = {
			LCHRecipeName: 'ALFA',
		};
		deepEqual(mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

	it('includes if diacritic insensitive match', function() {
		const item = {
			LCHRecipeName: 'álfa',
		};
		deepEqual(mainModule.LCHLaunchxrFilterFunction(fuzzysortPackage, 'alf', [item]), [item]);
	});

});
