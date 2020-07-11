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

describe('LCHSettingMetalWrite', function test_LCHSettingMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHSettingMetalWrite(LCHTestingStorageClient, null), /LCHErrorInputNotValid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHSettingMetalWrite(LCHTestingStorageClient, Object.assign(kTesting.StubSettingObjectValid(), {
			LCHSettingKey: null,
		}))).LCHErrors, {
			LCHSettingKey: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHSetting', async function() {
		let item = await mainModule.LCHSettingMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());

		deepEqual(item, Object.assign(kTesting.StubSettingObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('LCHSettingMetalRead', function test_LCHSettingMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHSettingMetalRead(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHSettingMetalRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHSetting', async function() {
		let item = await mainModule.LCHSettingMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());

		deepEqual(await mainModule.LCHSettingMetalRead(LCHTestingStorageClient, item.LCHSettingKey), item);
	});

});

describe('LCHSettingMetalList', function test_LCHSettingMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.LCHSettingMetalList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHSettings', async function() {
		let item = await mainModule.LCHSettingMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid());
		deepEqual(Object.values(await mainModule.LCHSettingMetalList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.LCHSettingMetalList(LCHTestingStorageClient)), [item.LCHSettingKey]);
	});

});

describe('LCHSettingMetalDelete', function test_LCHSettingMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHSettingMetalDelete(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHSettingMetalDelete(LCHTestingStorageClient, (await mainModule.LCHSettingMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid())).LCHSettingKey), {
			statusCode: 200,
		});
	});

	it('deletes LCHSetting', async function() {
		await mainModule.LCHSettingMetalDelete(LCHTestingStorageClient, (await mainModule.LCHSettingMetalWrite(LCHTestingStorageClient, kTesting.StubSettingObjectValid())).LCHSettingKey);
		deepEqual(await mainModule.LCHSettingMetalList(LCHTestingStorageClient), {});
	});

});
