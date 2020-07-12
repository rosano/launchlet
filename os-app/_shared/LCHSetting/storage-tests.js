const { throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('LCHSettingStorageCollectionName', function test_LCHSettingStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.LCHSettingStorageCollectionName(), 'lch_settings');
	});

});

describe('LCHSettingStorageCollectionType', function test_LCHSettingStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.LCHSettingStorageCollectionType(), 'lch_setting');
	});

});

describe('LCHSettingStorageCollectionPath', function test_LCHSettingStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mainModule.LCHSettingStorageCollectionPath(), mainModule.LCHSettingStorageCollectionName() + '/');
	});

});

describe('LCHSettingStorageObjectPath', function test_LCHSettingStorageObjectPath() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHSettingStorageObjectPath({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = StubSettingObjectValid();
		deepEqual(mainModule.LCHSettingStorageObjectPath(item), mainModule.LCHSettingStorageCollectionPath() + item.LCHSettingKey);
	});

});
