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
	StubFormulaObjectValid: function() {
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
	await Promise.all(Object.keys(await remoteStorage.lch_documents.listObjects()).map(remoteStorage.lch_documents.deleteObject));
});

describe('OLSKChangeDelegateProtocol', function testOLSKChangeDelegateProtocol() {

	it('calls OLSKChangeDelegateAdd on create', function(done) {
		kTesting.StubRemoteStorage({
			OLSKChangeDelegateAdd: function (inputData) {
				assert.deepEqual(inputData, Object.assign(kTesting.StubFormulaObjectValid(), {
					LCHMemberCreationDate: inputData.LCHMemberCreationDate,
					LCHMemberModificationDate: inputData.LCHMemberModificationDate,
					'@context': inputData['@context'],
				}));

				done();
			},
		}).lch_documents.writeObject('alfa', kTesting.StubFormulaObjectValid());
	});

	it('calls OLSKChangeDelegateUpdate on update', async function(done) {
		let remoteStorage = kTesting.StubRemoteStorage({
			OLSKChangeDelegateUpdate: function (inputData) {
				assert.deepEqual(inputData.LCHMemberBody, 'charlie');
				
				done();
			},
		});

		let item = remoteStorage.lch_documents.writeObject('alfa', kTesting.StubFormulaObjectValid());

		remoteStorage.lch_documents.writeObject(item.LCHMemberID, Object.assign(item, {
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

		remoteStorage.lch_documents.deleteObject((await remoteStorage.lch_documents.writeObject('alfa', kTesting.StubFormulaObjectValid())).LCHMemberID);
	});

});
