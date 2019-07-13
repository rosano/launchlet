import * as assert from 'assert';

import * as mainModule from './action.js';

const kTesting = {
	StubMemberObject: function() {
		return {
			LCHMemberBody: 'alfa',
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

describe('LCHMembersActionCreate', function testLCHMembersActionCreate() {

	it('rejects if not object', async function() {
		await assert.rejects(mainModule.LCHMembersActionCreate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		assert.deepEqual((await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, Object.assign(kTesting.StubMemberObject(), {
			LCHMemberBody: null,
		}))).LCHErrors, {
			LCHMemberBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHMember', async function() {
		let item = await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject());

		assert.deepEqual(item, Object.assign(kTesting.StubMemberObject(), {
			LCHMemberID: item.LCHMemberID,
			LCHMemberCreationDate: item.LCHMemberCreationDate,
			LCHMemberModificationDate: item.LCHMemberModificationDate,
			'@context': item['@context'],
		}));
	});

	it('sets LCHMemberID to unique value', async function() {
		let items = await kTesting.uSerial(Array.from(Array(10)).map(async function (e) {
			return (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberID;
		}));
		assert.deepEqual([...(new Set(items))], items);
	});

	it('sets LCHMemberCreationDate to now', async function() {
		assert.strictEqual(new Date() - (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberCreationDate < 100, true);
	});

	it('sets LCHMemberModificationDate to now', async function() {
		assert.strictEqual(new Date() - (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberModificationDate < 100, true);
	});

});

describe('LCHMembersActionRead', function testLCHMembersActionRead() {

	it('rejects if not string', async function() {
		await assert.rejects(mainModule.LCHMembersActionRead(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		assert.deepEqual(await mainModule.LCHMembersActionRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHMember', async function() {
		let item = await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject());

		assert.deepEqual(item, await mainModule.LCHMembersActionRead(LCHTestingStorageClient, item.LCHMemberID));
	});

});

describe('LCHMembersActionUpdate', function testLCHMembersActionUpdate() {

	it('rejects if not object', async function() {
		await assert.rejects(mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		assert.deepEqual((await mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, Object.assign(await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject()), {
			LCHMemberID: null,
		}))).LCHErrors, {
			LCHMemberID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHMember', async function() {
		let itemCreated = await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject());

		let item = await mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, itemCreated);

		assert.deepEqual(item, Object.assign(itemCreated, {
			LCHMemberModificationDate: item.LCHMemberModificationDate,
		}));
	});

	it('sets LCHMemberModificationDate to now', async function() {
		assert.strictEqual(new Date() - (await mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject()))).LCHMemberModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, Object.assign(kTesting.StubMemberObject(), {
			LCHMemberID: 'alfa',
			LCHMemberCreationDate: new Date(),
		}));
		assert.deepEqual(item, Object.assign(kTesting.StubMemberObject(), {
			LCHMemberID: item.LCHMemberID,
			LCHMemberCreationDate: item.LCHMemberCreationDate,
			LCHMemberModificationDate: item.LCHMemberModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('LCHMembersActionDelete', function testLCHMembersActionDelete() {

	it('rejects if not string', async function() {
		await assert.rejects(mainModule.LCHMembersActionDelete(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		assert.deepEqual(await mainModule.LCHMembersActionDelete(LCHTestingStorageClient, (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberID), {
			statusCode: 200,
		});
	});

	it('deletes LCHMember', async function() {
		let itemID;
		await mainModule.LCHMembersActionDelete(LCHTestingStorageClient, itemID = (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberID);
		assert.deepEqual(await mainModule.LCHMembersActionRead(LCHTestingStorageClient, itemID), null);
	});

});
