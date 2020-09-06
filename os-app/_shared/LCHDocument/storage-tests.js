const { rejects, throws, deepEqual } = require('assert');

const mainModule = require('./storage.js').default;

describe('LCHDocumentStorageCollectionName', function test_LCHDocumentStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mainModule.LCHDocumentStorageCollectionName(), 'lch_documents');
	});

});

describe('LCHDocumentStorageCollectionType', function test_LCHDocumentStorageCollectionType() {

	it('returns string', function() {
		deepEqual(mainModule.LCHDocumentStorageCollectionType(), 'lch_document');
	});

});

describe('LCHDocumentStorageCollectionPath', function test_LCHDocumentStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mainModule.LCHDocumentStorageCollectionPath(), mainModule.LCHDocumentStorageCollectionName() + '/');
	});

});

describe('LCHDocumentStorageObjectPath', function test_LCHDocumentStorageObjectPath() {

	it('throws error if not valid', function() {
		throws(function() {
			mainModule.LCHDocumentStorageObjectPath({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = StubDocumentObjectValid();
		deepEqual(mainModule.LCHDocumentStorageObjectPath(item), mainModule.LCHDocumentStorageCollectionPath() + item.LCHDocumentID);
	});

});

describe('LCHDocumentStorageMatch', function test_LCHDocumentStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHDocumentStorageMatch(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHDocumentStorageCollectionPath', function() {
		const item = mainModule.LCHDocumentStorageCollectionPath();
		deepEqual(mainModule.LCHDocumentStorageMatch(mainModule.LCHDocumentStorageObjectPath(StubDocumentObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no LCHDocumentStorageObjectPath', function() {
		deepEqual(mainModule.LCHDocumentStorageMatch(mainModule.LCHDocumentStorageObjectPath(StubDocumentObjectValid()) + '/'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHDocumentStorageMatch(mainModule.LCHDocumentStorageObjectPath(StubDocumentObjectValid())), true);
	});

});

describe('LCHDocumentStorageWrite', function test_LCHDocumentStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHDocumentStorageWrite(LCHTestingStorageClient, null), /LCHErrorInputNotValid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHDocumentStorageWrite(LCHTestingStorageClient, Object.assign(StubDocumentObjectValid(), {
			LCHDocumentID: null,
		}))).LCHErrors, {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubDocumentObjectValid();

		deepEqual(await mainModule.LCHDocumentStorageWrite(LCHTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mainModule.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid()), StubDocumentObjectValid());
	});

});

describe('LCHDocumentStorageList', function test_LCHDocumentStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.LCHDocumentStorageList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHDocuments', async function() {
		let item = await mainModule.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid());
		deepEqual(Object.values(await mainModule.LCHDocumentStorageList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.LCHDocumentStorageList(LCHTestingStorageClient)), [item.LCHDocumentID]);
	});

});

describe('LCHDocumentStorageDelete', function test_LCHDocumentStorageDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHDocumentStorageDelete(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHDocumentStorageDelete(LCHTestingStorageClient, (await mainModule.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid())).LCHDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes LCHDocument', async function() {
		await mainModule.LCHDocumentStorageDelete(LCHTestingStorageClient, (await mainModule.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid())).LCHDocumentID);
		deepEqual(await mainModule.LCHDocumentStorageList(LCHTestingStorageClient), {});
	});

});

