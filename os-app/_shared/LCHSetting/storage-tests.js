const { rejects, throws, deepEqual } = require('assert');

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

describe('LCHSettingStorageWrite', function test_LCHSettingStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, null), /LCHErrorInputNotValid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, Object.assign(StubSettingObjectValid(), {
			LCHSettingKey: null,
		}))).LCHErrors, {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubSettingObjectValid();

		deepEqual(await mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid()), StubSettingObjectValid());
	});

});

describe('LCHSettingStorageRead', function test_LCHSettingStorageRead() {

	it('throws if not string', function () {
		throws(function () {
			mainModule.LCHSettingStorageRead(LCHTestingStorageClient, 1);
		}, /LCHErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHSettingStorageRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHSetting', async function() {
		let item = await mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid());

		deepEqual(await mainModule.LCHSettingStorageRead(LCHTestingStorageClient, item.LCHSettingKey), item);
	});

});

describe('LCHSettingStorageList', function test_LCHSettingStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.LCHSettingStorageList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHSettings', async function() {
		let item = await mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid());
		deepEqual(Object.values(await mainModule.LCHSettingStorageList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.LCHSettingStorageList(LCHTestingStorageClient)), [item.LCHSettingKey]);
	});

});

describe('LCHSettingStorageDelete', function test_LCHSettingStorageDelete() {

	it('throws if not string', function () {
		throws(function () {
			mainModule.LCHSettingStorageDelete(LCHTestingStorageClient, 1);
		}, /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHSettingStorageDelete(LCHTestingStorageClient, (await mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid())).LCHSettingKey), {
			statusCode: 200,
		});
	});

	it('deletes LCHSetting', async function() {
		await mainModule.LCHSettingStorageDelete(LCHTestingStorageClient, (await mainModule.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid())).LCHSettingKey);
		deepEqual(await mainModule.LCHSettingStorageList(LCHTestingStorageClient), {});
	});

});
