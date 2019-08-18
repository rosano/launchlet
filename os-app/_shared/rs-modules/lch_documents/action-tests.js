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

describe('LCHFormulasActionCreate', function testLCHFormulasActionCreate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, Object.assign(kTesting.StubFormulaObject(), {
			LCHDocumentBody: null,
		}))).LCHErrors, {
			LCHDocumentBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		deepEqual(item, Object.assign(kTesting.StubFormulaObject(), {
			LCHDocumentID: item.LCHDocumentID,
			LCHDocumentCreationDate: item.LCHDocumentCreationDate,
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets LCHDocumentID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets LCHDocumentCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentCreationDate < 100, true);
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentModificationDate < 100, true);
	});

});

describe('LCHFormulasActionRead', function testLCHFormulasActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHFormulasActionRead(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHFormulasActionRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHDocument', async function() {
		let item = await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		deepEqual(item, await mainModule.LCHFormulasActionRead(LCHTestingStorageClient, item.LCHDocumentID));
	});

});

describe('LCHFormulasActionUpdate', function testLCHFormulasActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHFormulasActionUpdate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHFormulasActionUpdate(LCHTestingStorageClient, Object.assign(await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject()), {
			LCHDocumentID: null,
		}))).LCHErrors, {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHDocument', async function() {
		let itemCreated = await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		let item = await mainModule.LCHFormulasActionUpdate(LCHTestingStorageClient, itemCreated);

		deepEqual(item, Object.assign(itemCreated, {
			LCHDocumentModificationDate: item.LCHDocumentModificationDate,
		}));
	});

	it('sets LCHDocumentModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHFormulasActionUpdate(LCHTestingStorageClient, await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject()))).LCHDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.LCHFormulasActionUpdate(LCHTestingStorageClient, Object.assign(kTesting.StubFormulaObject(), {
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

describe('LCHFormulasActionDelete', function testLCHFormulasActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHFormulasActionDelete(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHFormulasActionDelete(LCHTestingStorageClient, (await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes LCHDocument', async function() {
		let itemID;
		await mainModule.LCHFormulasActionDelete(LCHTestingStorageClient, itemID = (await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject())).LCHDocumentID);
		deepEqual(await mainModule.LCHFormulasActionRead(LCHTestingStorageClient, itemID), null);
	});

});

describe('LCHFormulasActionList', function testLCHFormulasActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.LCHFormulasActionList(LCHTestingStorageClient), []);
	});

	it('returns array with existing LCHDocuments', async function() {
		let item = await mainModule.LCHFormulasActionCreate(LCHTestingStorageClient, kTesting.StubFormulaObject());

		deepEqual(await mainModule.LCHFormulasActionList(LCHTestingStorageClient), [item]);
	});

});
