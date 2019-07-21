import { rejects, deepEqual } from 'assert';

import * as mainModule from './action.js';

const kTesting = {
	StubMemberObject: function() {
		return {
			LCHMemberArgs: 'alfa',
			LCHMemberBody: 'bravo',
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
		await rejects(mainModule.LCHMembersActionCreate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, Object.assign(kTesting.StubMemberObject(), {
			LCHMemberBody: null,
		}))).LCHErrors, {
			LCHMemberBody: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns LCHMember', async function() {
		let item = await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject());

		deepEqual(item, Object.assign(kTesting.StubMemberObject(), {
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
		deepEqual([...(new Set(items))], items);
	});

	it('sets LCHMemberCreationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberCreationDate < 100, true);
	});

	it('sets LCHMemberModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberModificationDate < 100, true);
	});

});

describe('LCHMembersActionRead', function testLCHMembersActionRead() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHMembersActionRead(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		deepEqual(await mainModule.LCHMembersActionRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHMember', async function() {
		let item = await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject());

		deepEqual(item, await mainModule.LCHMembersActionRead(LCHTestingStorageClient, item.LCHMemberID));
	});

});

describe('LCHMembersActionUpdate', function testLCHMembersActionUpdate() {

	it('rejects if not object', async function() {
		await rejects(mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, Object.assign(await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject()), {
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

		deepEqual(item, Object.assign(itemCreated, {
			LCHMemberModificationDate: item.LCHMemberModificationDate,
		}));
	});

	it('sets LCHMemberModificationDate to now', async function() {
		deepEqual(new Date() - (await mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject()))).LCHMemberModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		let item = await mainModule.LCHMembersActionUpdate(LCHTestingStorageClient, Object.assign(kTesting.StubMemberObject(), {
			LCHMemberID: 'alfa',
			LCHMemberCreationDate: new Date(),
		}));
		deepEqual(item, Object.assign(kTesting.StubMemberObject(), {
			LCHMemberID: item.LCHMemberID,
			LCHMemberCreationDate: item.LCHMemberCreationDate,
			LCHMemberModificationDate: item.LCHMemberModificationDate,
			'@context': item['@context'],
		}));
	});

});

describe('LCHMembersActionDelete', function testLCHMembersActionDelete() {

	it('rejects if not string', async function() {
		await rejects(mainModule.LCHMembersActionDelete(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mainModule.LCHMembersActionDelete(LCHTestingStorageClient, (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberID), {
			statusCode: 200,
		});
	});

	it('deletes LCHMember', async function() {
		let itemID;
		await mainModule.LCHMembersActionDelete(LCHTestingStorageClient, itemID = (await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject())).LCHMemberID);
		deepEqual(await mainModule.LCHMembersActionRead(LCHTestingStorageClient, itemID), null);
	});

});

describe('LCHMembersActionList', function testLCHMembersActionList() {

	it('returns array', async function() {
		deepEqual(await mainModule.LCHMembersActionList(LCHTestingStorageClient), []);
	});

	it('returns array with existing LCHMembers', async function() {
		let item = await mainModule.LCHMembersActionCreate(LCHTestingStorageClient, kTesting.StubMemberObject());

		deepEqual(await mainModule.LCHMembersActionList(LCHTestingStorageClient), [item]);
	});

});
