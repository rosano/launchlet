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

describe('LCHFormulasMetalWrite', function testLCHFormulasMetalWrite() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHFormulasMetalWrite(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHFormulasMetalWrite(LCHTestingStorageClient, Object.assign(kTesting.StubFormulaObjectValid(), {
			LCHDocumentID: null,
		}))).LCHErrors, {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHFormulasMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid());

		deepEqual(item, Object.assign(kTesting.StubFormulaObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('LCHFormulasMetalRead', function testLCHFormulasMetalRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHFormulasMetalRead(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHFormulasMetalRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHFormulasMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid());

		deepEqual(await mainModule.LCHFormulasMetalRead(LCHTestingStorageClient, item.LCHDocumentID), item);
	});

});

describe('LCHFormulasMetalList', function testLCHFormulasMetalList() {

	it('returns empty array if none', async function() {
		deepEqual(await mainModule.LCHFormulasMetalList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHDocuments', async function() {
		let item = await mainModule.LCHFormulasMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid());
		deepEqual(Object.values(await mainModule.LCHFormulasMetalList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mainModule.LCHFormulasMetalList(LCHTestingStorageClient)), [item.LCHDocumentID]);
	});

});

describe('LCHFormulasMetalDelete', function testLCHFormulasMetalDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHFormulasMetalDelete(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHFormulasMetalDelete(LCHTestingStorageClient, (await mainModule.LCHFormulasMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid())).LCHDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes LCHDocument', async function() {
		await mainModule.LCHFormulasMetalDelete(LCHTestingStorageClient, (await mainModule.LCHFormulasMetalWrite(LCHTestingStorageClient, kTesting.StubFormulaObjectValid())).LCHDocumentID);
		deepEqual(await mainModule.LCHFormulasMetalList(LCHTestingStorageClient), {});
	});

});
