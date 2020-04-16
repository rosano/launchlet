const { rejects, deepEqual } = require('assert');

const mainModule = require('./metal.js');

const kTesting = {
	StubDocumentObjectValid: function() {
		return {
			LCHDocumentID: 'alfa',
			LCHDocumentCallbackArgs: 'bravo',
			LCHDocumentCallbackBody: 'charlie',
			LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('LCHDocumentMetalWrite', function test_LCHDocumentMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, null), /LCHErrorInputNotValid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, Object.assign(kTesting.StubDocumentObjectValid(), {
			LCHDocumentID: null,
		}))).LCHErrors, {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(item, Object.assign(kTesting.StubDocumentObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('LCHDocumentMetalRead', function test_LCHDocumentMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHDocumentMetalRead(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHDocumentMetalRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubDocumentObjectValid());

		deepEqual(await mainModule.LCHDocumentMetalRead(LCHTestingStorageClient, item.LCHDocumentID), item);
	});

});

describe('LCHDocumentMetalList', function test_LCHDocumentMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHDocuments', async function() {
		let item = await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient)), [item.LCHDocumentID]);
	});

});

describe('LCHDocumentMetalDelete', function test_LCHDocumentMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHDocumentMetalDelete(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHDocumentMetalDelete(LCHTestingStorageClient, (await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubDocumentObjectValid())).LCHDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes LCHDocument', async function() {
		await mainModule.LCHDocumentMetalDelete(LCHTestingStorageClient, (await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubDocumentObjectValid())).LCHDocumentID);
		deepEqual(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient), {});
	});

});
