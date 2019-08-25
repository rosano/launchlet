const assert = require('assert');

const mainModule = require('./metal.js');

const kTesting = {
	StubSettingObjectValid: function() {
		return {
			LCHSettingKey: 'alfa',
			LCHSettingValue: 'bravo',
		};
	},
};

describe('LCHSettingsMetalWrite', function testLCHSettingsMetalWrite() {

	it('rejects if not object', async function() {
		await assert.rejects(mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		assert.deepEqual((await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, Object.assign(kTesting.StubSettingObjectValid(), {
			LCHSettingKey: null,
		}))).LCHErrors, {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHSetting', async function() {
		let item = await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());

		assert.deepEqual(item, Object.assign(kTesting.StubSettingObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('LCHSettingsMetalRead', function testLCHSettingsMetalRead() {

	it('rejects if not string', async function() {
		await assert.rejects(mainModule.LCHSettingsMetalRead(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		assert.deepEqual(await mainModule.LCHSettingsMetalRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHSetting', async function() {
		let item = await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());

		assert.deepEqual(await mainModule.LCHSettingsMetalRead(LCHTestingStorageClient, item.LCHSettingKey), item);
	});

});

describe('LCHSettingsMetalList', function testLCHSettingsMetalList() {

	it('returns empty array if none', async function() {
		assert.deepEqual(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHSettings', async function() {
		let item = await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());
		assert.deepEqual(Object.values(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient)), [item]);
		assert.deepEqual(Object.keys(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient)), [item.LCHSettingKey]);
	});

});

describe('LCHSettingsMetalDelete', function testLCHSettingsMetalDelete() {

	it('rejects if not string', async function() {
		await assert.rejects(mainModule.LCHSettingsMetalDelete(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		assert.deepEqual(await mainModule.LCHSettingsMetalDelete(LCHTestingStorageClient, (await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid())).LCHSettingKey), {
			statusCode: 200,
		});
	});

	it('deletes LCHSetting', async function() {
		await mainModule.LCHSettingsMetalDelete(LCHTestingStorageClient, (await mainModule.LCHSettingsMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid())).LCHSettingKey);
		assert.deepEqual(await mainModule.LCHSettingsMetalList(LCHTestingStorageClient), {});
	});

});
