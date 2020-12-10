const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;

describe('LCHSettingStorageCollectionName', function test_LCHSettingStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mod.LCHSettingStorageCollectionName(), 'lch_settings');
	});

});

describe('LCHSettingStorageCollectionPath', function test_LCHSettingStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mod.LCHSettingStorageCollectionPath(), mod.LCHSettingStorageCollectionName() + '/');
	});

});

describe('LCHSettingStorageObjectPath', function test_LCHSettingStorageObjectPath() {

	it('throws error if not valid', function() {
		throws(function() {
			mod.LCHSettingStorageObjectPath({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = StubSettingObjectValid();
		deepEqual(mod.LCHSettingStorageObjectPath(item), mod.LCHSettingStorageCollectionPath() + item.LCHSettingKey);
	});

});

describe('LCHSettingStorageWrite', function test_LCHSettingStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mod.LCHSettingStorageWrite(LCHTestingStorageClient, null), /LCHErrorInputNotValid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mod.LCHSettingStorageWrite(LCHTestingStorageClient, Object.assign(StubSettingObjectValid(), {
			LCHSettingKey: null,
		}))).LCHErrors, {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubSettingObjectValid();

		deepEqual(await mod.LCHSettingStorageWrite(LCHTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid()), StubSettingObjectValid());
	});

});

describe('LCHSettingStorageRead', function test_LCHSettingStorageRead() {

	it('throws if not string', function () {
		throws(function () {
			mod.LCHSettingStorageRead(LCHTestingStorageClient, 1);
		}, /LCHErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mod.LCHSettingStorageRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHSetting', async function() {
		let item = await mod.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid());

		deepEqual(await mod.LCHSettingStorageRead(LCHTestingStorageClient, item.LCHSettingKey), item);
	});

});

describe('LCHSettingStorageList', function test_LCHSettingStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mod.LCHSettingStorageList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHSettings', async function() {
		let item = await mod.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid());
		deepEqual(Object.values(await mod.LCHSettingStorageList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mod.LCHSettingStorageList(LCHTestingStorageClient)), [item.LCHSettingKey]);
	});

});

describe('LCHSettingStorageDelete', function test_LCHSettingStorageDelete() {

	it('throws if not string', function () {
		throws(function () {
			mod.LCHSettingStorageDelete(LCHTestingStorageClient, 1);
		}, /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mod.LCHSettingStorageDelete(LCHTestingStorageClient, (await mod.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid())).LCHSettingKey), {
			statusCode: 200,
		});
	});

	it('deletes LCHSetting', async function() {
		await mod.LCHSettingStorageDelete(LCHTestingStorageClient, (await mod.LCHSettingStorageWrite(LCHTestingStorageClient, StubSettingObjectValid())).LCHSettingKey);
		deepEqual(await mod.LCHSettingStorageList(LCHTestingStorageClient), {});
	});

});
