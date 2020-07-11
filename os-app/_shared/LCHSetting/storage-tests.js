const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('LCHSettingStoragePath', function test_LCHSettingStoragePath() {

	it('returns string', function() {
		deepEqual(mainModule.LCHSettingStoragePath('alfa'), 'lch_settings/alfa');
	});

	it('returns string if blank', function() {
		deepEqual(mainModule.LCHSettingStoragePath(''), 'lch_settings/');
	});

	it('returns string if undefined', function() {
		deepEqual(mainModule.LCHSettingStoragePath(), 'lch_settings/');
	});

});
