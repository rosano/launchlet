const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js').default;

describe('LCHLaunchxrModeCommit', function test_LCHLaunchxrModeCommit() {

	it('returns string', function() {
		deepEqual(mainModule.LCHLaunchxrModeCommit(), 'kLCHLaunchxrModeCommit');
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
			mainModule.LCHLaunchxrModeCommit(),
			mainModule.LCHLaunchxrModePreview(),
			mainModule.LCHLaunchxrModePipe(),
			mainModule.LCHLaunchxrModeTask(),
		]);
	});

});
