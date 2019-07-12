const assert = require('assert');

const mainModule = require('./metal.js');

const kTesting = {
	StubMemberObjectValid: function() {
		return {
			LCHMemberID: 'alfa',
			LCHMemberBody: 'bravo',
			LCHMemberCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHMemberModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('LCHMembersMetalWrite', function testLCHMembersMetalWrite() {

	it('rejects if not object', async function() {
		await assert.rejects(mainModule.LCHMembersMetalWrite(LCHTestingStorageClient, null), /LCHErrorInputInvalid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		assert.deepEqual((await mainModule.LCHMembersMetalWrite(LCHTestingStorageClient, Object.assign(kTesting.StubMemberObjectValid(), {
			LCHMemberID: null,
		}))).LCHErrors, {
			LCHMemberID: [
				'LCHErrorNotString',
			],
		})
	});

	it('returns LCHMember', async function() {
		let item = await mainModule.LCHMembersMetalWrite(LCHTestingStorageClient, kTesting.StubMemberObjectValid());

		assert.deepEqual(item, Object.assign(kTesting.StubMemberObjectValid(), {
			'@context': item['@context'],
		}));
	});

});

describe('LCHMembersMetalRead', function testLCHMembersMetalRead() {

	it('rejects if not string', async function() {
		await assert.rejects(mainModule.LCHMembersMetalRead(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns null if not found', async function() {
		assert.deepEqual(await mainModule.LCHMembersMetalRead(LCHTestingStorageClient, 'alfa'), null);
	});

	it('returns LCHMember', async function() {
		let item = await mainModule.LCHMembersMetalWrite(LCHTestingStorageClient, kTesting.StubMemberObjectValid());

		assert.deepEqual(await mainModule.LCHMembersMetalRead(LCHTestingStorageClient, item.LCHMemberID), item);
	});

});

describe('LCHMembersMetalList', function testLCHMembersMetalList() {

	it('returns empty array if none', async function() {
		assert.deepEqual(await mainModule.LCHMembersMetalList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHMembers', async function() {
		let item = await mainModule.LCHMembersMetalWrite(LCHTestingStorageClient, kTesting.StubMemberObjectValid());
		assert.deepEqual(Object.values(await mainModule.LCHMembersMetalList(LCHTestingStorageClient)), [item]);
		assert.deepEqual(Object.keys(await mainModule.LCHMembersMetalList(LCHTestingStorageClient)), [item.LCHMemberID]);
	});

});

describe('LCHMembersMetalDelete', function testLCHMembersMetalDelete() {

	it('rejects if not string', async function() {
		await assert.rejects(mainModule.LCHMembersMetalDelete(LCHTestingStorageClient, 1), /LCHErrorInputInvalid/);
	});

	it('returns statusCode', async function() {
		assert.deepEqual(await mainModule.LCHMembersMetalDelete(LCHTestingStorageClient, (await mainModule.LCHMembersMetalWrite(LCHTestingStorageClient, kTesting.StubMemberObjectValid())).LCHMemberID), {
			statusCode: 200,
		});
	});

	it('deletes LCHMember', async function() {
		await mainModule.LCHMembersMetalDelete(LCHTestingStorageClient, (await mainModule.LCHMembersMetalWrite(LCHTestingStorageClient, kTesting.StubMemberObjectValid())).LCHMemberID);
		assert.deepEqual(await mainModule.LCHMembersMetalList(LCHTestingStorageClient), {});
	});

});
