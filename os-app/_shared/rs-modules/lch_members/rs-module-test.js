return;

const assert = require('assert');

const mainModule = require('./rs-module.js');

const RemoteStorage = require('remotestoragejs');

const kTesting = {
	StubRemoteStorage: function(inputData) {
		let e = mainModule(inputData);

		let outputData = new RemoteStorage({
			modules: [e],
		});

		outputData.access.claim(e.name, 'rw');

		return outputData;
	},
	StubMemberObjectValid: function() {
		return {
			LCHMemberID: 'alfa',
			LCHMemberBody: 'bravo',
			LCHMemberCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHMemberModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

beforeEach(async function() {
	let remoteStorage = kTesting.StubRemoteStorage();
	await Promise.all(Object.keys(await remoteStorage.lch_members.listObjects()).map(remoteStorage.lch_members.deleteObject));
});

describe('OLSKChangeDelegateProtocol', function testOLSKChangeDelegateProtocol() {

	it('calls OLSKChangeDelegateAdd on create', function(done) {
		kTesting.StubRemoteStorage({
			OLSKChangeDelegateAdd: function (inputData) {
				assert.deepEqual(inputData, Object.assign(kTesting.StubMemberObjectValid(), {
					LCHMemberCreationDate: inputData.LCHMemberCreationDate,
					LCHMemberModificationDate: inputData.LCHMemberModificationDate,
					'@context': inputData['@context'],
				}));

				done();
			},
		}).lch_members.writeObject('alfa', kTesting.StubMemberObjectValid());
	});

	it('calls OLSKChangeDelegateUpdate on update', async function(done) {
		let remoteStorage = kTesting.StubRemoteStorage({
			OLSKChangeDelegateUpdate: function (inputData) {
				assert.deepEqual(inputData.LCHMemberBody, 'charlie');
				
				done();
			},
		});

		let item = remoteStorage.lch_members.writeObject('alfa', kTesting.StubMemberObjectValid());

		remoteStorage.lch_members.writeObject(item.LCHMemberID, Object.assign(item, {
			LCHMemberBody: 'charlie',
		}));
	});

	it('calls OLSKChangeDelegateRemove on delete', async function(done) {
		let remoteStorage = kTesting.StubRemoteStorage({
			OLSKChangeDelegateRemove: function (inputData) {
				assert.deepEqual(inputData.LCHMemberID, 'alfa');
				
				done();
			},
		});

		remoteStorage.lch_members.deleteObject((await remoteStorage.lch_members.writeObject('alfa', kTesting.StubMemberObjectValid())).LCHMemberID);
	});

});
