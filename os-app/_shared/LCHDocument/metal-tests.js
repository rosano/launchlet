import { rejects, deepEqual } from 'assert';

import * as mainModule from './metal.js';

const kTesting = {
	StubFormulaObjectValid: function() {
		return {
			LCHDocumentID: 'alfa',
			LCHDocumentArgs: 'bravo',
			LCHDocumentBody: 'charlie',
			LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('LCHDocumentMetalWrite', function testLCHDocumentMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHDocumentID: null,
		}))).LCHErrors, {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid());

		deepEqual(item, Object.assign(kTesting.StubFormulaObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('LCHDocumentMetalRead', function testLCHDocumentMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHDocumentMetalRead(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHDocumentMetalRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid());

		deepEqual(await mainModule.LCHDocumentMetalRead(LCHTestingStorageClient, item.LCHDocumentID), item);
	});

});

describe('LCHDocumentMetalList', function testLCHDocumentMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHDocuments', async function() {
		let item = await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid());
		deepEqual(Object.values(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient)), [item.LCHDocumentID]);
	});

});

describe('LCHDocumentMetalDelete', function testLCHDocumentMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHDocumentMetalDelete(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHDocumentMetalDelete(LCHTestingStorageClient, (await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid())).LCHDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes LCHDocument', async function() {
		await mainModule.LCHDocumentMetalDelete(LCHTestingStorageClient, (await mainModule.LCHDocumentMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid())).LCHDocumentID);
		deepEqual(await mainModule.LCHDocumentMetalList(LCHTestingStorageClient), {});
	});

});
