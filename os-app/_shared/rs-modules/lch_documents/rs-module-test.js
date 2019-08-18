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
			LCHDocumentID: 'alfa',
			LCHDocumentBody: 'bravo',
			LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
			LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
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
					LCHDocumentCreationDate: inputData.LCHDocumentCreationDate,
					LCHDocumentModificationDate: inputData.LCHDocumentModificationDate,
					'@context': inputData['@context'],
				}));

				done();
			},
		}).lch_documents.writeObject('alfa', kTesting.StubFormulaObjectValid());
	});

	it('calls OLSKChangeDelegateUpdate on update', async function(done) {
		let remoteStorage = kTesting.StubRemoteStorage({
			OLSKChangeDelegateUpdate: function (inputData) {
				assert.deepEqual(inputData.LCHDocumentBody, 'charlie');
				
				done();
			},
		});

		let item = remoteStorage.lch_documents.writeObject('alfa', kTesting.StubFormulaObjectValid());

		remoteStorage.lch_documents.writeObject(item.LCHDocumentID, Object.assign(item, {
			LCHDocumentBody: 'charlie',
		}));
	});

	it('calls OLSKChangeDelegateRemove on delete', async function(done) {
		let remoteStorage = kTesting.StubRemoteStorage({
			OLSKChangeDelegateRemove: function (inputData) {
				assert.deepEqual(inputData.LCHDocumentID, 'alfa');
				
				done();
			},
		});

		remoteStorage.lch_documents.deleteObject((await remoteStorage.lch_documents.writeObject('alfa', kTesting.StubFormulaObjectValid())).LCHDocumentID);
	});

});
