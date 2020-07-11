const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js').default;

const kTesting = {
	StubSettingObjectValid: function() {
		return {
			LCHSettingKey: 'alfa',
			LCHSettingValue: 'bravo',
		};
	},
};

describe('LCHSettingsMetalWrite', function test_LCHSettingsMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, null), /LCHErrorInputNotValid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, Object.assign(kTesting.StubSettingObjectValid(), {
			LCHSettingKey: null,
		}))).LCHErrors, {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHSetting', async function() {
		let item = await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());

		deepEqual(item, Object.assign(kTesting.StubSettingObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('LCHSettingsMetalRead', function test_LCHSettingsMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHSettingsMetalRead(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHSettingsMetalRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHSetting', async function() {
		let item = await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());

		deepEqual(await mainModule.LCHSettingsMetalRead(LCHTestingStorageClient, item.LCHSettingKey), item);
	});

});

describe('LCHSettingsMetalList', function test_LCHSettingsMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHSettings', async function() {
		let item = await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());
		deepEqual(Object.values(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient)), [item.LCHSettingKey]);
	});

});

describe('LCHSettingsMetalDelete', function test_LCHSettingsMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHSettingsMetalDelete(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHSettingsMetalDelete(LCHTestingStorageClient, (await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid())).LCHSettingKey), {
			statusCode: 200,
		});
	});

	it('deletes LCHSetting', async function() {
		await mainModule.LCHSettingsMetalDelete(LCHTestingStorageClient, (await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid())).LCHSettingKey);
		deepEqual(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient), {});
	});

});
