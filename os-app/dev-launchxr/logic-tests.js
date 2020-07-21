const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js').default;

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
