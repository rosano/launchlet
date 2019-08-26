import { rejects, deepEqual } from 'assert';

import * as mainModule from './action.js';

const kTesting = {
	StubFormulaObject: function() {
		return {
			LCHDocumentArgs: 'alfa',
			LCHDocumentBody: 'bravo',
		};
	},
	uSerial: function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	},
	uSleep: function (inputData) {
		let endTime = new Date().getTime();
		while (new Date().getTime() < endTime + inputData) {}
	},
};

describe('LCHDocumentActionCreate', function testLCHDocumentActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, Object.assign(kTesting.StubFormulaObject(), {
			LCHDocumentBody: null,
		}))).LCHErrors, {
			LCHDocumentBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		deepEqual(item, Object.assign(kTesting.StubFormulaObject(), {
			LCHDocumentID: item.LCHDocumentID,
			LCHDocumentCreationDate: item.LCHDocumentCreationDate,
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets LCHDocumentID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets LCHDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentCreationDate < 100, true);
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentModificationDate < 100, true);
	});

});

describe('LCHDocumentActionRead', function testLCHDocumentActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHDocumentActionRead(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHDocumentActionRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		deepEqual(item, await mainModule.LCHDocumentActionRead(LCHTestingStorageClient, item.LCHDocumentID));
	});

});

describe('LCHDocumentActionUpdate', function testLCHDocumentActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHDocumentActionUpdate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHDocumentActionUpdate(LCHTestingStorageClient, Object.assign(await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject()), {
			LCHDocumentID: null,
		}))).LCHErrors, {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let itemCreated = await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		let item = await mainModule.LCHDocumentActionUpdate(LCHTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
		}));
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHDocumentActionUpdate(LCHTestingStorageClient, await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject()))).LCHDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.LCHDocumentActionUpdate(LCHTestingStorageClient, Object.assign(kTesting.StubFormulaObject(), {
			LCHDocumentID: 'alfa',
			LCHDocumentCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubFormulaObject(), {
			LCHDocumentID: item.LCHDocumentID,
			LCHDocumentCreationDate: item.LCHDocumentCreationDate,
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('LCHDocumentActionDelete', function testLCHDocumentActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHDocumentActionDelete(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHDocumentActionDelete(LCHTestingStorageClient, (await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes LCHDocument', async function() {
		let itemID;
		await mainModule.LCHDocumentActionDelete(LCHTestingStorageClient, itemID = (await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentID);
		deepEqual(await mainModule.LCHDocumentActionRead(LCHTestingStorageClient, itemID), null);
	});

});

describe('LCHDocumentActionList', function testLCHDocumentActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.LCHDocumentActionList(LCHTestingStorageClient), []);
	});

	it('returns array with existing LCHDocuments', async function() {
		let item = await mainModule.LCHDocumentActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		deepEqual(await mainModule.LCHDocumentActionList(LCHTestingStorageClient), [item]);
	});

});
